/** Shape the contact action returns to its client component. */
export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
  /** Echoed back so a rejected form keeps what the visitor typed. */
  values?: Record<string, string>;
};

export const idleState: FormState = { status: "idle" };
