export interface RegisterPatientInput {
  email: string;
  password: string;
  confirmPassword?: string;
  firstName: string;
  lastName: string;
}

export interface RegisterDoctorInput {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  licenseNumber: string;
  specialization: string;
  hospital: string;
  yearsOfExperience: string;
  password: string;
  confirmPassword?: string;
}
