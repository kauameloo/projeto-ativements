import { Octokit } from "octokit";

const token = "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";

// Gerar a conexão com a api do github
export const octokit = new Octokit({
  auth: token,
});
