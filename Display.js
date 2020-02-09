class Display {
  static translateElevator(elevator, distance) {
    elevator.style.transform += `translateY(${distance}00px)`
  }

  // static updateCurrentA() {
  //   let a_current = document.querySelector('.elevatorA p');
  //   a_current.innerHTML = `Current floor: ${elevatorA.position}`;
  // }
  //
  // static updateCurrentB() {
  //   let b_current = document.querySelector('.elevatorB p');
  //   b_current.innerHTML = `Current floor: ${elevatorB.position}`;
  // }

  static updateCurrent(current, elevator) {
    current.innerHTML = `Current floor: ${elevator.position}`
  }

static elevatorDirection(elevator, requestedFloor, direction, panel) {
  if ( (elevator.position - requestedFloor) < 0) {
    direction.forEach(element => element.innerHTML = '▲')
    panel.innerHTML = "Moving: Up"
  }
  else if ( (elevator.position - requestedFloor) > 0) {
    direction.forEach(element => element.innerHTML = '▼')
    panel.innerHTML = "Moving: Down"
  }
  else {
    direction.forEach(element => element.innerHTML = '');
    panel.innerHTML = `Held at ${elevator.position}`
  }
}
  static fillInner(segment, position) {
    segment[position].classList.add('filled')
  }

  static clearInner(segments) {
    segments.forEach(segment => segment.classList.remove('filled'))
  }
  // static togglePanel(innerPanel) {
  //   if (innerPanel.style.display == 'none') {
  //     innerPanel.style.display = 'flex';
  //   } else {
  //     innerPanel.style.display = "none";
  //   }
  // }
}
