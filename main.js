class Elevator {
  constructor(name, position) {
    this.name = name;
    this.position = position;
  }
}

class Dispatcher {
  static moveLift(elevator, floor) {
    elevator.position = floor;
    console.log(`Calling ${elevator.name} at floor ${floor}`);
    console.log(`${elevator.name} is now on floor ${elevator.position}`)
  }

  static mainDispatch(requestedFloor) {
    // distances and destinations
    var distanceA = Math.abs(requestedFloor - elevatorA.position)
    var distanceB = Math.abs(requestedFloor - elevatorB.position)
    var destinationA = elevatorA.position - requestedFloor;
    var destinationB = elevatorB.position - requestedFloor;
    // elevators & panels
    var elevatorDivA = document.querySelector('.A')
    var elevatorDivB = document.querySelector('.B')
    var innerPanelA = document.querySelector('.EL_A')
    var innerPanelB = document.querySelector('.EL_B')
    var directionA = document.querySelectorAll('.liftA')
    var directionB = document.querySelectorAll('.liftB')
    var panelA = document.querySelector('#directionA');
    var panelB = document.querySelector('#directionB')
    var segmentsA = [...document.querySelectorAll('.segmentA')].reverse();
    var segmentsB = [...document.querySelectorAll('.segmentB')].reverse();
    // main
    if (distanceA > distanceB) {
      Display.elevatorDirection(elevatorB, requestedFloor, directionB, panelB);
      Dispatcher.moveLift(elevatorB, requestedFloor);
      Display.clearInner(segmentsB)
      Display.fillInner(segmentsB, elevatorB.position)
      Display.updateCurrentB();
      Display.translateElevator(elevatorDivB, destinationB);
    }
    else if (distanceB > distanceA) {
      Display.elevatorDirection(elevatorA, requestedFloor, directionA, panelA);
      Dispatcher.moveLift(elevatorA, requestedFloor)
      Display.clearInner(segmentsA);
      Display.fillInner(segmentsA, elevatorA.position)
      Display.updateCurrentA();
      Display.translateElevator(elevatorDivA, destinationA)
    }
    else if (distanceA === distanceB) {
      if (elevatorB.position > elevatorA.position) {
        Display.elevatorDirection(elevatorA, requestedFloor, directionA, panelA)
        Dispatcher.moveLift(elevatorA, requestedFloor);
        Display.clearInner(segmentsA);
        Display.fillInner(segmentsA, elevatorA.position)
        Display.updateCurrentA();
        Display.translateElevator(elevatorDivA, destinationA);
      }
      if (elevatorA.position > elevatorB.position) {
        Display.elevatorDirection(elevatorA, requestedFloor, directionA, panelA);
        Dispatcher.moveLift(elevatorB, requestedFloor);
        Display.clearInner(segmentsB)
        Display.fillInner(segmentsB, elevatorB.position)
        Display.updateCurrentB();
        Display.translateElevator(elevatorDivB, destinationB);
      }
      if (elevatorB.position == elevatorA.position) {
        // In this case, I think it would make sense to check for occupancy and send the free lift or the one with least people inside
        // But since the problem doesn't account for that and we're not tracking passengers, I arbitrarily chose elevatorB
        Display.elevatorDirection(elevatorB, requestedFloor, directionB, panelB)
        Dispatcher.moveLift(elevatorB, requestedFloor);
        Display.clearInner(segmentsB)
        Display.fillInner(segmentsB, elevatorB.position)
        Display.updateCurrentB();
        Display.translateElevator(elevatorDivB, destinationB)
      }
    }
  }

  static innerDispatch(floor, elevator, elevatorDiv, innerPanel, segments, destination, direction, panel) {
    Display.elevatorDirection(elevator, floor, direction, panel)
    Dispatcher.moveLift(elevator, floor)
    Display.clearInner(segments)
    Display.fillInner(segments, elevator.position)
    Display.updateCurrentB();
    Display.translateElevator(elevatorDiv, destination)
  }
}

// Initialized lifts:
const elevatorA = new Elevator('Lift A', 0)
const elevatorB = new Elevator('Lift B', 6)

// EVENTS //

// listens for elevator call on each floor
const floorButtons = [...document.querySelectorAll('[data-key]')];
floorButtons.forEach(button => button.addEventListener("click", function callElevator(e) {
  let floor = e.target.dataset.key;
  Dispatcher.mainDispatch(floor)
}));


// listen for inner dispatch calls from inside elevators

// inside elevator B
document.querySelectorAll('.liftB_button').forEach(button => button.addEventListener("click", function moveElevator(e) {
  let floor = e.target.dataset.floor;
  var elevatorDiv = document.querySelector('.B')
  var innerPanelB = document.querySelector('.EL_B')
  let segmentsB = [...document.querySelectorAll('.segmentB')].reverse();
  var destinationB = elevatorB.position - floor;
  var directionB = document.querySelectorAll('.liftB  ')
  var panelB = document.querySelector('#directionB')
  Dispatcher.innerDispatch(floor, elevatorB, elevatorDiv, innerPanelB, segmentsB, destinationB, directionB, panelB)
}));

// inside elevator A
document.querySelectorAll('.liftA_button').forEach(button => button.addEventListener("click", function moveElevator(e) {
  let floor = e.target.dataset.floor;
  var elevatorDiv = document.querySelector('.A')
  var innerPanelA = document.querySelector('.EL_A')
  let segmentsA = [...document.querySelectorAll('.segmentA')].reverse();
  var destinationA = elevatorA.position - floor;
  var directionA = document.querySelectorAll('.liftA')
  var panelA = document.querySelector('#directionA');
  Dispatcher.innerDispatch(floor, elevatorA, elevatorDiv, innerPanelA, segmentsA, destinationA, directionA, panelA)
}));
