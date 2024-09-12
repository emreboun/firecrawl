import { WebCrawler } from "../scraper/WebScraper/crawler";
import { redisConnection } from "../services/queue-service";

export type StoredCrawl = {
  originUrl: string;
  crawlerOptions: any;
  pageOptions: any;
  team_id: string;
  plan: string;
  robots?: string;
  cancelled?: boolean;
  createdAt: number;
};

export async function saveCrawl(id: string, crawl: StoredCrawl) {
  await redisConnection.set("crawl:" + id, JSON.stringify(crawl));
  await redisConnection.expire("crawl:" + id, 24 * 60 * 60, "NX");
}

export async function getCrawl(id: string): Promise<StoredCrawl | null> {
  const x = await redisConnection.get("crawl:" + id);

  if (x === null) {
    return null;
  }

  return JSON.parse(x);
}

export async function getCrawlExpiry(id: string): Promise<Date> {
  const d = new Date();
  const ttl = await redisConnection.pttl("crawl:" + id);
  d.setMilliseconds(d.getMilliseconds() + ttl);
  d.setMilliseconds(0);
  return d;
}

export async function addCrawlJob(id: string, job_id: string) {
  await redisConnection.sadd("crawl:" + id + ":jobs", job_id);
  await redisConnection.expire("crawl:" + id + ":jobs", 24 * 60 * 60, "NX");
}

export async function addCrawlJobs(id: string, job_ids: string[]) {
  await redisConnection.sadd("crawl:" + id + ":jobs", ...job_ids);
  await redisConnection.expire("crawl:" + id + ":jobs", 24 * 60 * 60, "NX");
}

export async function addCrawlJobDone(id: string, job_id: string) {
  await redisConnection.sadd("crawl:" + id + ":jobs_done", job_id);
  await redisConnection.lpush("crawl:" + id + ":jobs_done_ordered", job_id);
  await redisConnection.expire(
    "crawl:" + id + ":jobs_done",
    24 * 60 * 60,
    "NX"
  );
  await redisConnection.expire(
    "crawl:" + id + ":jobs_done_ordered",
    24 * 60 * 60,
    "NX"
  );
}

export async function getDoneJobsOrderedLength(id: string): Promise<number> {
  return await redisConnection.llen("crawl:" + id + ":jobs_done_ordered");
}

export async function getDoneJobsOrdered(
  id: string,
  start = 0,
  end = -1
): Promise<string[]> {
  return await redisConnection.lrange(
    "crawl:" + id + ":jobs_done_ordered",
    start,
    end
  );
}

export async function isCrawlFinished(id: string) {
  return (
    (await redisConnection.scard("crawl:" + id + ":jobs_done")) ===
    (await redisConnection.scard("crawl:" + id + ":jobs"))
  );
}

export async function isCrawlFinishedLocked(id: string) {
  return await redisConnection.exists("crawl:" + id + ":finish");
}

export async function finishCrawl(id: string) {
  if (await isCrawlFinished(id)) {
    const set = await redisConnection.setnx("crawl:" + id + ":finish", "yes");
    if (set === 1) {
      await redisConnection.expire("crawl:" + id + ":finish", 24 * 60 * 60);
    }
    return set === 1;
  }
}

export async function getCrawlJobs(id: string): Promise<string[]> {
  return await redisConnection.smembers("crawl:" + id + ":jobs");
}

export async function lockURL(
  id: string,
  sc: StoredCrawl,
  url: string
): Promise<boolean> {
  if (typeof sc.crawlerOptions?.limit === "number") {
    if (
      (await redisConnection.scard("crawl:" + id + ":visited")) >=
      sc.crawlerOptions.limit
    ) {
      return false;
    }
  }
  const res =
    (await redisConnection.sadd("crawl:" + id + ":visited", url)) !== 0;
  await redisConnection.expire("crawl:" + id + ":visited", 24 * 60 * 60, "NX");
  return res;
}

/// NOTE: does not check limit. only use if limit is checked beforehand e.g. with sitemap
export async function lockURLs(id: string, urls: string[]): Promise<boolean> {
  const res =
    (await redisConnection.sadd("crawl:" + id + ":visited", ...urls)) !== 0;
  await redisConnection.expire("crawl:" + id + ":visited", 24 * 60 * 60, "NX");
  return res;
}

export function crawlToCrawler(id: string, sc: StoredCrawl): WebCrawler {
  const crawler = new WebCrawler({
    jobId: id,
    initialUrl: sc.originUrl,
    includes: sc.crawlerOptions?.includes ?? [],
    excludes: sc.crawlerOptions?.excludes ?? [],
    maxCrawledLinks: sc.crawlerOptions?.maxCrawledLinks ?? 1000,
    maxCrawledDepth: sc.crawlerOptions?.maxDepth ?? 10,
    limit: sc.crawlerOptions?.limit ?? 10000,
    generateImgAltText: sc.crawlerOptions?.generateImgAltText ?? false,
    allowBackwardCrawling: sc.crawlerOptions?.allowBackwardCrawling ?? false,
    allowExternalContentLinks:
      sc.crawlerOptions?.allowExternalContentLinks ?? false,
  });

  if (sc.robots !== undefined) {
    try {
      crawler.importRobotsTxt(sc.robots);
    } catch (_) {}
  }

  return crawler;
}

// ... other imports ...
/* 
export async function getPagedCrawlJobs(
  crawlId: string,
  page: number,
  pageSize: number
): Promise<[StoredCrawl[], number]> {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize - 1;

  const jobs: string[] = await redisConnection.lrange(
    `crawl:${crawlId}:jobs_done_ordered`,
    startIndex,
    endIndex
  );

  const totalJobs = await redisConnection.llen(
    `crawl:${crawlId}:jobs_done_ordered`
  );

  const storedJobs: any[] = [];
  for (const jobId of jobs) {
    const jobData = await redisConnection.hgetall(
      `crawl:${crawlId}:job:${jobId}`
    );
    if (jobData) {
      storedJobs.push({
        id: jobId,
        // ... other properties you want to retrieve from jobData
        success: jobData.success === "true", // Assuming success is stored as a string
        message: jobData.message,
        num_docs: parseInt(jobData.num_docs, 10),
        time_taken: parseFloat(jobData.time_taken),
        team_id: jobData.team_id,
      });
    }
  }

  return [storedJobs, totalJobs];
}

// ... other code ...
 */
