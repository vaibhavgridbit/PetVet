export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Pets: undefined;
  Appointments: undefined;
  Emergency: undefined;
  Profile: undefined;
};

export type PetStackParamList = {
  PetList: undefined;
  PetDetail: {petId: string};
  AddPet: undefined;
  EditPet: {petId: string};
  PetQRCode: {petId: string};
};

export type AppointmentStackParamList = {
  AppointmentList: undefined;
  BookAppointment: undefined;
  AppointmentDetail: {appointmentId: string};
  VetSearch: undefined;
  VetDetail: {vetId: string};
};
