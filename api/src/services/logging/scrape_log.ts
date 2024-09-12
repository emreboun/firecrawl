import "dotenv/config";
import { ScrapeLog } from "../../types";
import { supabase_service } from "../supabase_first";
import { PageOptions } from "../../lib/entities";
import { Logger } from "../../lib/logger";
import {
  getAuthConfig,
  getPostgresConfig,
  getPostgRESTConfig,
  getSSOProviders,
} from "../supabase";

export async function logScrape(
  scrapeLog: ScrapeLog,
  pageOptions?: PageOptions
) {
  if (process.env.USE_DB_AUTHENTICATION === "false") {
    Logger.debug("Skipping logging scrape to Supabase");
    return;
  }
  try {
    // Only log jobs in production
    // if (process.env.ENV !== "production") {
    //   return;
    // }
    // Redact any pages that have an authorization header
    if (
      pageOptions &&
      pageOptions.headers &&
      pageOptions.headers["Authorization"]
    ) {
      scrapeLog.html = "REDACTED DUE TO AUTHORIZATION HEADER";
    }
    /* console.log("asd");
    Logger.info("asd1");

    const config = await getAuthConfig();
    Logger.info(`config: \n${config}`);
    const providers = await getSSOProviders();
    Logger.info(`providers: \n${providers}`);
    const postConfig = await getPostgresConfig();
    Logger.info(`postConfig: \n${postConfig}`);
    const restConfig = await getPostgRESTConfig();
    Logger.info(`restConfig: \n${restConfig}`); */

    //Logger.info(`log: \n${scrapeLog.toString()}`);

    const { data, error } = await supabase_service.from("scrape_logs").insert([
      {
        url: scrapeLog.url,
        scraper: scrapeLog.scraper,
        success: scrapeLog.success,
        response_code: scrapeLog.response_code,
        time_taken_seconds: scrapeLog.time_taken_seconds,
        proxy: scrapeLog.proxy,
        retried: scrapeLog.retried,
        error_message: scrapeLog.error_message,
        date_added: new Date().toISOString(),
        html: "Removed to save db space",
        ipv4_support: scrapeLog.ipv4_support,
        ipv6_support: scrapeLog.ipv6_support,
      },
    ]);

    if (error) {
      Logger.error(`Error logging proxy:\n${JSON.stringify(error)}`);
    }
  } catch (error) {
    Logger.error(`Error logging proxy:\n${JSON.stringify(error)}`);
  }
}
