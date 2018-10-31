RMRELEASE=$(SSH) rm -f $(CURRENT)
MKRELEASE=$(SSH) ln -sf $(APPDIR) $(CURRENT)
INSERTSERVICE=$(SSH) sudo /usr/local/bin/insert-apps-service $(PROJECT) $(SERVICE)

release:
	@echo " ### RELEASING CODE\n---\n"
	$(RMRELEASE)
	$(MKRELEASE)
	$(INSERTSERVICE)
	@echo "---\n"
