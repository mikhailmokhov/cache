const core = require('@actions/core')

try {
  const tags = ["scope:server"]
  core.info(tags.toString());
  core.setOutput('tags', tags);
} catch (error) {
  core.setFailed(error.message);
}
