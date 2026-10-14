// Illustrative profile. Replace with the owner's real information.
export const profile = {
  name: 'Alex Morgan',
  firstName: 'Alex',
  initials: 'AM',
  role: 'Electronics engineer',
  intro: 'I design circuits, write firmware, and build prototypes. This is my notebook: a few projects, the work behind them, and some things I do away from the bench.',
  about: 'I’m Alex. Most of my work sits between hardware and software: laying out a board, getting a sensor to behave, or finding out why a circuit works on paper but not on the bench.',
  philosophy: 'I keep the sketches and the failed attempts. They’re usually more useful than a tidy photograph of the finished thing.',
  email: 'hello@example.com',
  github: '',
  linkedin: '',
  location: 'Your city, your country',
};

export const projects = [
  {
    id: 'radio', number: '01', title: 'Pocket FM receiver', subtitle: 'Receiver circuit, audio stage, and a hand-tuned enclosure.',
    category: 'ANALOG / RF', tags: ['Circuit design', 'PCB layout', 'Prototyping'], color: 'sage',
    description: 'A sample project for a small FM radio with a physical tuning dial. The case study follows the receiver, amplifier, board layout, and enclosure.',
    challenge: 'Fit a receiver and audio amplifier into a small case while keeping electrical noise out of the signal path.',
    approach: 'Test the receiver and amplifier separately, check the power supply, then bring the circuits together on a custom board. Leave room to reach the controls and service the assembly.',
    notes: ['Receiver and audio stages', 'Board layout and enclosure', 'Physical tuning dial'],
  },
  {
    id: 'sensor', number: '02', title: 'Room sensor', subtitle: 'Temperature, humidity, and light on one small board.',
    category: 'EMBEDDED SYSTEMS', tags: ['Embedded C', 'Sensors', 'IoT'], color: 'sand',
    description: 'A sample environmental monitor built around temperature, humidity, and light sensors. A small display shows the current readings.',
    challenge: 'Get consistent readings from several sensors without making the firmware difficult to change.',
    approach: 'Bring up each sensor independently. Keep acquisition, calibration, and display code separate so the hardware can change without rewriting the application.',
    notes: ['Sensor interfaces', 'Modular firmware', 'Local display'],
  },
  {
    id: 'motor', number: '03', title: 'Motor controller', subtitle: 'An encoder, a driver, and a feedback loop.',
    category: 'CONTROL SYSTEMS', tags: ['Motor control', 'PID', 'Mechatronics'], color: 'rose',
    description: 'A sample closed-loop motor controller. The project pairs a driver circuit with an encoder and a small test rig for observing the response.',
    challenge: 'Hold a requested speed as the load changes, and make the response easy to measure.',
    approach: 'Check the driver and encoder signals first, then implement the control loop. Record the response to a speed change and tune the controller against those measurements.',
    notes: ['Encoder feedback', 'Driver circuit', 'Control-loop tuning'],
  },
];

export const journey = [
  { date: '20XX — PRESENT', type: 'WORK', title: 'Electronics engineer', place: 'Company name · Location', description: 'Your current role. Add the hardware, software, and responsibilities you work with.' },
  { date: '20XX — 20XX', type: 'WORK', title: 'Engineering intern', place: 'Company name', description: 'Your first engineering role. Add a few specific tasks and what you learned from them.' },
  { date: '20XX — 20XX', type: 'STUDY', title: 'B.Eng. in Electronics', place: 'University name', description: 'Your degree and areas of study. Add a relevant lab, research topic, or final-year project.' },
];

export const hobbies = [
  { id: 'camera', title: 'Film photography', label: '35 MM / CONTACT SHEETS', text: 'A camera comes along on most walks. I like having a finite number of frames and no screen to check.' },
  { id: 'vinyl', title: 'Records', label: '33⅓ RPM / SIDE A', text: 'A small collection, usually played a whole side at a time. The sleeves take up more space than they should.' },
  { id: 'mountain', title: 'Walking further', label: 'TRAILS / FIELD NOTES', text: 'A map, a flask, and an early start. A few hours outside is a good way to stop thinking about a stubborn circuit.' },
];
