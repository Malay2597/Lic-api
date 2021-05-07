const mapMonth = (data) => {
  if (data > 12) {
    return data % 12;
  }
  return data
}

const update = async () => {
  try {
    const agg = [{
      '$addFields': {
        'created_at': {
          '$toDate': '$DOC'
        }
      }
    }];
    const policyHolders = await PolicyHolder.aggregate(agg).exec();
    
    // Adding due month
    policyHolders.forEach(obj => {
      console.log(obj);
      const month = obj.CreatedAt.getMonth();
      const dueMonthArray = [];
      switch (obj.Mode) {
        case 'YLY':
          dueMonthArray.push(month + 1);
          break;
        case 'HLY':
          dueMonthArray.push(mapMonth(month + 1), mapMonth(month + 7));
          break;
        case 'QLY':
          dueMonthArray.push(mapMonth(month + 1), mapMonth(month + 4), mapMonth(month + 7), mapMonth(month + 10));
          break;
      }
      console.log(dueMonthArray);
    })

    // Adding CreatedAt
    policyHolders.forEach(obj => {
      console.log(obj.created_at);
      const month = obj.created_at.toLocaleString('default', {
        month: 'long'
      });
      // console.log(month);
      PolicyHolder.findByIdAndUpdate(obj._id, {
        $set: {
          CreatedAt: obj.created_at
        }
      }, {
        new: true
      }, function (err, obj) {
        if (err) {
          console.log(err)
        };
        console.log(obj);
      });
    });
  } catch (err) {
    console.log('error' + err);
  }
}