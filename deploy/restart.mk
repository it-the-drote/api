restart:
	@echo " ### RESTARTING CODE\n---\n"
	$(SSH) sudo /bin/systemctl restart $(SERVICE)
	$(SSH) sudo /bin/systemctl reload nginx.service
	@echo "---\n"
