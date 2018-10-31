test:
	@echo " ### TESTING CODE\n---\n"
	$(SSH) nginx -t
	@echo "---\n"
