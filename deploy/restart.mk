restart:
	@echo " ### RESTARTING CODE\n---\n"
	$(SSH) sudo /bin/systemctl restart $(SERVICE)
	@echo "---\n"
