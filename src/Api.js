import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001"; 
console.log(REACT_APP_BASE_URL);
/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

export default class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.message);
      let message = err.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on all companies. */

  static async getCompanies(search={}) {
    let res = await this.request(`companies`, search);
    return res.companies;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get details on all jobs. */

  static async getJobs(search={}) {
    let res = await this.request(`jobs`, search);
    return res.jobs;
  }

  /** Get details on a job by title. */

  static async getJob(jobId) {
    let res = await this.request(`jobs/${jobId}`);
    return res.job;
  }

  /** Register a user. */
  static async registerUser(data){
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Login validated user. */
  static async loginUser(data){
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  static async getUser(username){
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Update user profile */
  static async patchUser(username, data){
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  /** Apply to job */
  static async postUserJob(username, job_id){
    let res = await this.request(`users/${username}/jobs/${job_id}`, {}, "post");
    return res.user;
  }

  /** Check if user has already applied to job */
  static async getUserJob(username, job_id){
    let res = await this.request(`users/${username}/jobs/${job_id}`);
    return res;
  }
  // obviously, you'll add a lot here ...
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = localStorage.getItem('token');