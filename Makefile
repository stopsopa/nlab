h: j# show any help that is available
	@echo more info: https://github.com/stopsopa/nlab

c: # run local server to browse coverage
	@node server.js --log 15 --dir docs

cc: # run local server for general testing
	@nodemon -e js,html server.js --log 15

yarn:
	/bin/bash bash/swap-files-v2.sh package.json package.dev.json -- yarn

j: # just run tests once
	@/bin/bash jest.sh --help

nt: # test .npmignore
	@npm pack

style_list:
	/bin/bash bash/swap-files-v2.sh package.json package.dev.json -- yarn style:list	

style_check:
	/bin/bash bash/swap-files-v2.sh package.json package.dev.json -- yarn style:check	

style_fix:
	/bin/bash bash/swap-files-v2.sh package.json package.dev.json -- yarn style:fix	
