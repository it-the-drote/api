VERSION=`git rev-list master --count`
SRCDIR=src
SSH=ssh -p $(PORT) $(USERNAME)@$(SERVER)

APPDIR=/opt/apps/$(PROJECT)/releases/$(VERSION)
LATEST=/opt/apps/$(PROJECT)/latest
CURRENT=/opt/apps/$(PROJECT)/current

MKAPPDIR=$(SSH) mkdir -p $(APPDIR)
UPLOAD=scp -P $(PORT) -r $(SRCDIR)/* $(USERNAME)@$(SERVER):$(APPDIR)
RMLATEST=$(SSH) rm -f $(LATEST)
MKLATEST=$(SSH) ln -s $(APPDIR) $(LATEST)

INSERTNGINXCFG=$(SSH) sudo /usr/local/bin/insert-nginx-config $(LATEST)/nginx/apps-api.conf

upload:
	@echo " ### UPLOADING CODE\n---\n"
	$(MKAPPDIR)
	$(UPLOAD)
	$(RMLATEST)
	$(MKLATEST)
	$(INSERTNGINXCFG)
	@echo "---\n"
