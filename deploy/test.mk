test:
	@echo " ### TESTING CODE\n---\n"
	$(SSH) /usr/sbin/nginx -t
	@echo "---\n"
