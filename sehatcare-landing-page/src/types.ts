export interface Medication {
  id: string;
  name: string;
  dosage: string;
  checked: boolean;
  type: "pill" | "tablet" | "droplet";
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  rate: string;
  image: string;
  slots: { day: string; date: number }[];
}

export interface AppState {
  patientName: string;
  patientAge: number;
  bloodPressureSys: number;
  bloodPressureDia: number;
  activeScreenId: number; // 1-5, representing the 5 reference mockups
  medications: Medication[];
  doctors: Doctor[];
  selectedDoctorId: string;
  selectedSlot: string; // e.g. "Mon 21"
  videoCallTimer: number; // in seconds, counts up if screen is 5
  isVideoMuted: boolean;
  isVideoCameraOff: boolean;
  labResultsCount: number;
  checkupsCount: number;
  contactFormSubmitted: boolean;
}
