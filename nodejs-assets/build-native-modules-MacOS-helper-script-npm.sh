#!/bin/bash
      # Helper script for Gradle to call npm on macOS in case it is not found
      export PATH=$PATH:/usr/local/lib/node_modules/npm/node_modules/npm-lifecycle/node-gyp-bin:/Users/galamon/Documents/MoodableApp/node_modules/nodejs-mobile-react-native/node_modules/.bin:/Users/galamon/Documents/MoodableApp/node_modules/.bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin:/Applications/VMware Fusion.app/Contents/Public:/opt/X11/bin:/Library/Frameworks/Mono.framework/Versions/Current/Commands:/Applications/Wireshark.app/Contents/MacOS:/Users/galamon/.npm-packages/bin
      npm $@
    