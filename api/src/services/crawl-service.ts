/* // ... other imports ...
import { getScrapeQueue } from "./queue-service";
import { logJob } from "./logging/log_job";
import { getCrawl, getPagedCrawlJobs } from "../lib/crawl-redis";

// ... (other code) ...

export async function updateParentJobWithCrawlResults(crawlId: string) {
  try {
    const [jobs, totalJobs] = await getPagedCrawlJobs(crawlId, 1, 10000); // Fetch up to 10,000 child jobs
    const parentJob = await getScrapeQueue().getJob(crawlId);

    if (!parentJob) {
      console.error("Parent job not found for crawl ID:", crawlId);
      return;
    }

    const successfulJobs: any[] = jobs.filter((job: any) => job.success);
    const failedJobs: any[] = jobs.filter((job: any) => !job.success);

    const numDocs = successfulJobs.reduce(
      (sum, job) => sum + (job.num_docs || 0),
      0
    );
    const timeTaken = Math.max(...jobs.map((job: any) => job.time_taken || 0));

    const firstSuccess = successfulJobs.length > 0 ? successfulJobs[0] : null;

    await logJob({
      job_id: crawlId,
      success: successfulJobs.length > 0,
      message: firstSuccess
        ? firstSuccess.message
        : failedJobs.length > 0
        ? failedJobs[0].message
        : "Crawl completed",
      num_docs: numDocs,
      docs: [], // You might need to adjust this based on your needs
      time_taken: timeTaken,
      team_id: firstSuccess ? firstSuccess.team_id : null,
      mode: "crawl",
      url: parentJob.data.url,
      crawlerOptions: parentJob.data.crawlerOptions,
      pageOptions: parentJob.data.pageOptions,
      origin: parentJob.data.origin,
    });
  } catch (error) {
    console.error("Error updating parent job with crawl results:", error);
    // Handle the error appropriately (e.g., log to Sentry)
  }
}

// ... (other code) ...
 */
