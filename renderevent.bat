@echo off
rem this will point the command to the working directory of the batch file.
cd %~dp0
cd events
del *.html
jade -P ./ --out ./