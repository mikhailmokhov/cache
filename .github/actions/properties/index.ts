import * as core from '@actions/core';

const main = async () => {
  const tags = ["scope:server"]

  core.info(tags.toString());

  core.setOutput('tags', tags);
};

main().catch((e) => {
  core.setFailed(e);
});
