import time
import logging
import webbrowser
from subprocess import Popen
from watchdog.observers import Observer
from watchdog.events import LoggingEventHandler,FileSystemEventHandler

import server

class JadeHandler(FileSystemEventHandler):
   def renderJade(self):
      p=Popen("rpost.bat",cwd="./",shell=True)
      stdout, stderr = p.communicate()
      return p
   def on_created(self,event):
      print("File created ->"+event.src_path)
      self.renderJade()
   def on_modified(self,event):
      print("File modified ->"+event.src_path)
      self.renderJade()

def startLogger():
   logging.basicConfig(level=logging.INFO,
                        format='%(asctime)s - %(message)s',
                        datefmt='%Y-%m-%d %H:%M:%S')   
   event_handler = LoggingEventHandler()
   observer = Observer()
   observer.schedule(event_handler, ".", recursive=True)
   observer.start()
   try:
      while True:
         time.sleep(1)
   except KeyboardInterrupt:
      observer.stop()
   observer.join()

if __name__ == "__main__":
   jade_handler  = JadeHandler()   
   renderer = Observer()
   renderer.schedule(jade_handler, "post", recursive=True)
   renderer.start()
   server.serve()
   startLogger()
