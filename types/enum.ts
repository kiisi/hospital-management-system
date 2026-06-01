export enum UserRole {
  ADMIN = "admin",
  DOCTOR = "doctor",
  PATIENT = "patient",
}

export enum AppointmentStatus {
  PENDING = "pending",
  APPROVED = "approved",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
}

export enum PaymentMethod {
  CARD = "card",
  BANK_TRANSFER = "bank_transfer",
}

export enum PaymentStatus {
  PAID = "paid",
  PENDING = "pending",
  FAILED = "failed",
}
