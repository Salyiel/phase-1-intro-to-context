// Your code here

function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(records){
    const employeeRecords = []
    records.forEach(record => {
        const employee = createEmployeeRecord(record)
        employeeRecords.push(employee)
    })
    return employeeRecords
}

function createTimeInEvent(employeeRecord, timeString){
    const dateTime = timeString.split(' ')
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        date: dateTime[0],
        hour: parseInt(dateTime[1]),
    })
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, timeString){
    const dateTime = timeString.split(' ')
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        date: dateTime[0],
        hour: parseInt(dateTime[1])
    })
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, dateString){
    const inObj = employeeRecord.timeInEvents.find(element => element.date === dateString)
    const outObj = employeeRecord.timeOutEvents.find(element => element.date === dateString)
    return (outObj.hour - inObj.hour) / 100
}

function wagesEarnedOnDate(employeeRecord, dateString){
    const inObj = employeeRecord.timeInEvents.find(element => element.date === dateString)
    const outObj = employeeRecord.timeOutEvents.find(element => element.date === dateString)
    return (outObj.hour - inObj.hour) / 100 * employeeRecord.payPerHour
}

function allWagesFor(emploeeRecord){
    const totalDays = emploeeRecord.timeInEvents.length
    let sum = 0
    for (let i = 0; i < totalDays; i++ ){
      const totalHours = (emploeeRecord.timeOutEvents[i].hour - emploeeRecord.timeInEvents[i].hour)/100
      sum = sum + (totalHours) * emploeeRecord.payPerHour
    }
  return sum
}

function calculatePayroll(employeeRecordArr){
    let sum = 0
    for (let i = 0; i < employeeRecordArr.length; i++){
        sum = sum + allWagesFor(employeeRecordArr[i])
    }
    return sum
}