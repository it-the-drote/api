PROJECT=api
SERVICE=apps-api

all: upload build test
release: upgrade restart
rollback: downgrade restart

include deploy/target.mk
include deploy/upload.mk
include deploy/build.mk
include deploy/test.mk
include deploy/release.mk
include deploy/restart.mk
include deploy/rollback.mk
