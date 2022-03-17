(function () {
  let taskList = [];
  let totalTaskCount = 0;
  let currentTaskNumber = 0;
  let taskHandle = null;

  let totalTaskCountElem = document.querySelector('#totalTaskCount');
  let currentTaskNumberElem = document.querySelector('#currentTaskNumber');
  let progressBarElem = document.querySelector('#progress');
  let startButtonElem = document.querySelector('#startButton');
  let logElem = document.querySelector('#log');

  let logFragment = null;
  let statusRefreshScheduled = false; 

  function enqueueTask(taskHandler, taskData) {
    taskList.push({
      handler: taskHandler,
      data: taskData,
    });

    totalTaskCount++;

    if (!taskHandle) {
      taskHandle = requestIdleCallback(runTaskQueue, {
        timeout: 1000,
      });
    }

    scheduleStatusRefresh();
  }

  function runTaskQueue(deadline) {
    while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && taskList.length) {
      const task = taskList.shift();
      currentTaskNumber++;
      task.handler(task.data);
      scheduleStatusRefresh();
    }

    if (taskList.length) {
      taskHandle = requestIdleCallback(runTaskQueue, {
        timeout: 1000,
      });
    } else {
      taskHandle = 0;
    }
  }

  function scheduleStatusRefresh() {
    if (!statusRefreshScheduled) {
      requestAnimationFrame(updateDisplay);
      statusRefreshScheduled = true;
    }
  }

  function updateDisplay() {
    let scrollToEnd = logElem.scrollHeight > logElem.clientHeight;

    if (totalTaskCount) {
      if (progressBarElem.max !== totalTaskCount) {
        totalTaskCountElem.textContent = totalTaskCount;
        progressBarElem.max = totalTaskCount;
      }

      if (progressBarElem.value !== currentTaskNumber) {
        currentTaskNumberElem.textContent = currentTaskNumber;
        progressBarElem.value = currentTaskNumber;
      }
    }

    if (logFragment) {
      logElem.appendChild(logFragment);
      logFragment = null;
    }

    if (scrollToEnd) {
      logElem.scrollTop = logElem.scrollHeight - logElem.clientHeight;
    }

    statusRefreshScheduled = false;
  }

  function log(text) {
    if (!logFragment) {
      logFragment = document.createDocumentFragment();
    }

    const el = document.createElement('div');
    el.textContent = text;
    logFragment.appendChild(el);
  }

  function logTaskHandler(data) {
    log(`running task #${currentTaskNumber}`);

    for (let i = 0, len = data.count; i < len; i++) {
      log((i + 1).toString() + '. ' + data.text);
    }
  }

  function decodeTechnoStuff() {
    totalTaskCount = 0;
    currentTaskNumber = 0;
    updateDisplay();
    logElem.innerHTML = '';

    let n = Math.ceil(Math.random() * 100) + 100;

    for (let i = 0; i < n; i++) {
      let taskData = {
        count: Math.ceil(Math.random() * 75) + 75,
        text: `this text is from task number ${(i + 1).toString()} of ${n}`
      }

      enqueueTask(logTaskHandler, taskData);
    }
  }

  startButtonElem.addEventListener('click', decodeTechnoStuff, false);
})();