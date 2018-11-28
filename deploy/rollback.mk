PREVIOUS=`$(SSH) "ls -1 /opt/apps/api/releases/ | tail -n 2 | head -n 1"`
MKROLLBACK=$(SSH) ln -sf $(PREVIOUS) $(CURRENT)

downgrade:
	@echo " ### ROLLING BACK TO PREVIOUS RELEASE\n---\n"
	$(RMRELEASE)
	$(MKROLLBACK)
	$(INSERTSERVICE)
	@echo "---\n"
