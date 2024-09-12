/* // New file for the crawl completion event listener
import { Worker } from "bullmq";
import { getCrawlCompletionQueue, redisConnection } from "./queue-service";
import { updateParentJobWithCrawlResults } from "./crawl-service"; // Implement this function

const crawlCompletionWorker = new Worker(
  getCrawlCompletionQueue().name,
  async (job) => {
    if (job.name === "crawlCompleted") {
      const { crawl_id } = job.data;
      await updateParentJobWithCrawlResults(crawl_id);
    }
  },
  { connection: redisConnection }
);

crawlCompletionWorker.on("error", (err) => {
  // Handle errors appropriately
  console.error("Crawl completion worker error:", err);
});
 */
