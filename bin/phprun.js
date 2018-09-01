#!/usr/bin/env node

'use strict';

/** Modules */
const
  shelljs = require('shelljs'),
  chokidar = require('chokidar'),
  colors = require('colors')
;

/** 기본 변수 설정 */
let script = process.argv[2]; // 첫번째 인자에 실행 할 php 스크립트 입력.
let  executable = '/usr/bin/php'; // php 실행 파일 위치.

let argv = process.argv.slice(3); // 인자를 전달.
let args = argv.join(' ');

/** 해당 실행 파일과 하위 php 를 watch */
chokidar.watch([script, "**/*.php"], { awaitWriteFinish: true })
  .on('ready', () => {
    console.log(`[phpmon] php: ${executable}`.yellow)
    console.log(`[phpmon] watching: \'${script}\'`.yellow)
    console.log(`[phpmon] first run:`.yellow)
      shelljs.exec(`${executable} ${script} ${args}`)
  })
  .on('change', (path, stats) => {
    console.log(`\n[phpmon] changed \'${path}\'`.green)
    if(stats) {
      shelljs.exec(`${executable} ${script} ${args}`)
    }
  })
;
