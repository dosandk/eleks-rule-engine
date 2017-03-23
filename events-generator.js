(function() {
  const dataItems = [
   { ['ON'] : '10' },
   { ['OFF']: '1'  },
   { ['D']  : '5'  }, // current
  ];

  const used16hRules = [1];

  const createEvents = startTS => data => {
    let len = data.length;
    const result = [];
    let total = 0;

    while(len--) {
      const item = data[len];
      const [mode] = Object.keys(item);
      const [hours = 0, minutes = 0] = item[mode].split(':');
      const duration = parseInt(hours, 10) * 3600000 + parseInt(minutes, 10) * 60000;

      total += duration;

      result.push({
        ts: startTS - total,
        event: mode
      });
    }

    return result;
  };

  const now = Date.now();
    
  const createUsed16hRules = (now, used16hRules) => {
    const timestampsArr = [];

    const total = used16hRules.reduce((accum, item) => {
        const result = accum - item * 3600000;

        timestampsArr.push(result);

        return result;
    }, now);

    timestampsArr.forEach(item => {
      console.log(new Date(item));
      updateUsing16hRuleTest(item);
    });
  }

  createUsed16hRules(now, used16hRules);

  createEvents(now)(dataItems)
    .reverse()
    .forEach(item => {
      console.log(new Date(item.ts), item.event);
      window.updateStatusTest(item)
     });
  window.onUpdateStatusFinished();

  createUsed16hRules(now, used16hRules);
}())

