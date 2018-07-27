---
sidebar: auto
prev: /gerrit/extend.html#hooks钩子
next: false
---

# Gerrit Code Review - Hooks

#### version v2.11.5
#### Table of Contents

[[toc]]

Gerrit does not run any of the standard git hooks in the repositories it works with, but it does have its own hook mechanism included. Gerrit looks in '$site_path'/hooks for executables with names listed below.

The environment will have GIT_DIR set to the full path of the affected git repository so that git commands can be easily run.

Make sure your hook scripts are executable if running on *nix.

With the exception of the ref-update hook, hooks are run in the background after the relevant change has taken place so are unable to affect the outcome of any given change. Because of the fact the hooks are run in the background after the activity, a hook might not be notified about an event if the server is shutdown before the hook can be invoked.

## Supported Hooks
### ref-update
This is called when a push request is received by Gerrit. It allows a push to be rejected before it is committed to the Gerrit repository. If the script exits with non-zero return code the push will be rejected. Any output from the script will be returned to the user, regardless of the return code.

This hook is called synchronously so it is recommended that it not block. A default timeout on the hook is set to 30 seconds to avoid "runaway" hooks using up server threads. See [hooks.syncHookTimeout]() for configuration details.

```
ref-update --project <project name> --refname <refname> --uploader <uploader> --oldrev <sha1> --newrev <sha1>
```

### patchset-created

This is called whenever a patchset is created (this includes new changes and drafts).

```
patchset-created --change <change id> --is-draft <boolean> --kind <change kind> --change-url <change url> --change-owner <change owner> --project <project name> --branch <branch> --topic <topic> --uploader <uploader> --commit <sha1> --patchset <patchset id>
```

#### kind
change kind represents the kind of change uploaded, also represented in [patchSet](https://gerrit.wikimedia.org/r/Documentation/json.html#patchSet)

- **REWORK**
Nontrivial content changes.

- **TRIVIAL_REBASE**
Conflict-free merge between the new parent and the prior patch set.

- **NO_CODE_CHANGE**
No code changed; same tree and same parent tree.

- **NO_CHANGE**
No changes; same commit message, same tree and same parent tree.

### draft-published
This is called whenever a draft change is published.
```
draft-published --change <change id> --change-url <change url> --change-owner <change owner> --project <project name> --branch <branch> --topic <topic> --uploader <uploader> --commit <sha1> --patchset <patchset id>
```

### comment-added
This is called whenever a comment is added to a change.

```
comment-added --change <change id> --is-draft <boolean> --change-url <change url> --change-owner <change owner> --project <project name> --branch <branch> --topic <topic> --author <comment author> --commit <commit> --comment <comment> [--<approval category id> <score> --<approval category id> <score> ...]
```

### change-merged
Called whenever a change has been merged.

```
change-merged --change <change id> --change-url <change url> --change-owner <change owner> --project <project name> --branch <branch> --topic <topic> --submitter <submitter> --commit <sha1> --newrev <sha1>
```

### merge-failed
Called whenever a change has failed to merge.

```
merge-failed --change <change id> --change-url <change url> --change-owner <change owner> --project <project name> --branch <branch> --topic <topic> --submitter <submitter> --commit <sha1> --reason <reason>
```

### change-abandoned
Called whenever a change has been abandoned.

```
change-abandoned --change <change id> --change-url <change url> --change-owner <change owner> --project <project name> --branch <branch> --topic <topic> --abandoner <abandoner> --commit <sha1> --reason <reason>
```

### change-restored
Called whenever a change has been restored.

```
change-restored --change <change id> --change-url <change url> --change-owner <change owner> --project <project name> --branch <branch> --topic <topic> --restorer <restorer> --commit <sha1> --reason <reason>
```

### ref-updated
Called whenever a ref has been updated.

```
ref-updated --oldrev <old rev> --newrev <new rev> --refname <ref name> --project <project name> --submitter <submitter>
```

### reviewer-added
Called whenever a reviewer is added to a change.

```
reviewer-added --change <change id> --change-url <change url> --change-owner <change owner> --project <project name> --branch <branch> --reviewer <reviewer>
```

### topic-changed
Called whenever a change’s topic is changed from the Web UI or via the REST API.

```
topic-changed --change <change id> --change-owner <change owner> --project <project name> --branch <branch> --changer <changer> --old-topic <old topic> --new-topic <new topic>
```

### hashtags-changed
Called whenever hashtags are added to or removed from a change from the Web UI or via the REST API.

```
hashtags-changed --change <change id>  --change-owner <change owner> --project <project name> --branch <branch> --editor <editor> --added <hashtag> --removed <hashtag> --hashtag <hashtag>
```
The `--added` parameter may be passed multiple times, once for each hashtag that was added to the change.

The `--removed` parameter may be passed multiple times, once for each hashtag that was removed from the change.

The `--hashtag` parameter may be passed multiple times, once for each hashtag remaining on the change after the add or remove operation has been performed.

### cla-signed
Called whenever a user signs a contributor license agreement.

```
cla-signed --submitter <submitter> --user-id <user_id> --cla-id <cla_id>
```

## Configuration Settings
It is possible to change where Gerrit looks for hooks, and what filenames it looks for, by adding a [hooks] section in gerrit.config.

Gerrit will use the value of hooks.path for the hooks directory.

For the hook filenames, Gerrit will use the values of hooks.patchsetCreatedHook, hooks.draftPublishedHook, hooks.commentAddedHook, hooks.changeMergedHook, hooks.changeAbandonedHook, hooks.changeRestoredHook, hooks.refUpdatedHook, hooks.refUpdateHook, hooks.reviewerAddedHook and hooks.claSignedHook.

## Section Hooks
### hooks.path
Optional path to hooks, if not specified then `'$site_path'/hooks` will be used.

### hooks.syncHookTimeout
Optional timeout value in seconds for synchronous hooks, if not specified then `30` seconds will be used.

### hooks.changeAbandonedHook
Optional filename for the change abandoned hook, if not specified then `change-abandoned` will be used.

### hooks.changeMergedHook
Optional filename for the change merged hook, if not specified then `change-merged` will be used.

### hooks.changeRestoredHook
Optional filename for the change restored hook, if not specified then `change-restored` will be used.

### hooks.claSignedHook
Optional filename for the CLA signed hook, if not specified then `cla-signed` will be used.

### hooks.commentAddedHook
Optional filename for the comment added hook, if not specified then `comment-added` will be used.

### hooks.draftPublishedHook
Optional filename for the draft published hook, if not specified then `draft-published` will be used.

### hooks.hashtagsChangedHook
Optional filename for the hashtags changed hook, if not specified then `hashtags-changed` will be used.

### hooks.mergeFailedHook
Optional filename for the merge failed hook, if not specified then `merge-failed` will be used.

### hooks.patchsetCreatedHook
Optional filename for the patchset created hook, if not specified then `patchset-created` will be used.

### hooks.refUpdateHook
Optional filename for the ref update hook, if not specified then `ref-update` will be used.

### hooks.refUpdatedHook
Optional filename for the ref updated hook, if not specified then `ref-updated `will be used.

### hooks.reviewerAddedHook
Optional filename for the reviewer added hook, if not specified then `reviewer-added` will be used.

### hooks.topicChangedHook
Optional filename for the topic changed hook, if not specified then `topic-changed` will be used.

#### Part of Gerrit Code Review
#### Version v2.11.5