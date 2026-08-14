import { useState, type JSX } from "react";
import { Link } from "react-router-dom";
import Button from "../common/Button.tsx";
import Input from "../common/Input.tsx";
import { useForm } from "react-hook-form";
import GithubLogin from "../../pages/Auth/GithubLogIn.tsx";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};


type RegisterFormProps = {
  registerFunction: ( name: string, email: string, password: string) => Promise<void>;
};

export default function RegisterForm({registerFunction,}: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, watch, formState: { isSubmitting },} = useForm<RegisterFormData>();

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const passwordWeak =
    password?.length > 0 && password.length < 8;

  const passwordMismatch =
    confirmPassword?.length > 0 &&
    password !== confirmPassword;

  const onSubmit = async (data: RegisterFormData) => {
    setError("");

    if (data.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await registerFunction( data.name, data.email, data.password);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Registration failed."
      );
    }
  };


  return (
    <div className="mx-auto w-full max-w-[400px]">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-[22px] font-semibold tracking-tight text-white">
          Create your account
        </h1>

        <p className="mt-1.5 text-sm text-slate-500">
          Start securing your code. Free forever, no credit card required.
        </p>
      </div>

      {/* GitHub */}
      <GithubLogin />

      {/* Divider */}
      <div className="mb-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-white/[0.06]" />

        <span className="text-xs text-slate-600">
          or register with email
        </span>

        <span className="h-px flex-1 bg-white/[0.06]" />
      </div>

      {/* Error */}
      {error && (
        <div className="mb-5 flex items-start gap-2.5 rounded-lg border border-red-500/20 bg-red-500/8 px-3.5 py-3 text-sm text-red-400">
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>

        {/* Name */}
        <div className="mb-4">
          <label
            htmlFor="reg-name"
            className="mb-1.5 block text-sm font-medium text-slate-300"
          >
            Full name
          </label>

          <Input
            id="reg-name"
            type="text"
            autoComplete="name"
            placeholder="Jane Smith"
            className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-indigo-500/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-indigo-500/20"
            {...register("name", {
              required: "Name is required",
            })}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="reg-email"
            className="mb-1.5 block text-sm font-medium text-slate-300"
          >
            Email address
          </label>

          <Input
            id="reg-email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-indigo-500/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-indigo-500/20"
            {...register("email", {
              required: "Email is required",
            })}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="reg-password"
            className="mb-1.5 block text-sm font-medium text-slate-300"
          >
            Password
          </label>

          <div
            className={`flex items-center overflow-hidden rounded-lg border bg-white/[0.03] transition focus-within:ring-2 ${
              passwordWeak
                ? "border-red-500/40 focus-within:border-red-500/50 focus-within:ring-red-500/15"
                : "border-white/10 focus-within:border-indigo-500/50 focus-within:ring-indigo-500/20"
            }`}
          >
            <Input
              id="reg-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Min. 8 characters"
              className="flex-1 border-0 bg-transparent px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />

            <Button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="px-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 transition hover:text-slate-200"
            >
              {showPassword ? "Hide" : "Show"}
            </Button>
          </div>

          {passwordWeak && (
            <p className="mt-1.5 text-xs text-red-400">
              Password must be at least 8 characters.
            </p>
          )}
        </div>

        {/* Confirm password */}
        <div className="mb-6">
          <label
            htmlFor="reg-confirm"
            className="mb-1.5 block text-sm font-medium text-slate-300"
          >
            Confirm password
          </label>

          <div
            className={`flex items-center overflow-hidden rounded-lg border bg-white/[0.03] transition focus-within:ring-2 ${
              passwordMismatch
                ? "border-red-500/40 focus-within:border-red-500/50 focus-within:ring-red-500/15"
                : "border-white/10 focus-within:border-indigo-500/50 focus-within:ring-indigo-500/20"
            }`}
          >
            <Input
              id="reg-confirm"
              type={showConfirm ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Re-enter your password"
              className="flex-1 border-0 bg-transparent px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />

            <Button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="px-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 transition hover:text-slate-200"
            >
              {showConfirm ? "Hide" : "Show"}
            </Button>
          </div>

          {passwordMismatch && (
            <p className="mt-1.5 text-xs text-red-400">
              Passwords do not match.
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Creating Account…" : "Create Account"}
        </Button>
      </form>

      {/* Terms */}
      <p className="mt-4 text-center text-xs text-slate-600">
        By creating an account you agree to our{" "}
        <Link
          to="/terms"
          className="text-slate-500 underline underline-offset-2 hover:text-slate-300"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          to="/privacy"
          className="text-slate-500 underline underline-offset-2 hover:text-slate-300"
        >
          Privacy Policy
        </Link>
        .
      </p>

      {/* Login */}
      <div className="mt-4">
        <p className="mb-3 text-center text-xs text-slate-600">
          Already have an account?
        </p>

        <Link
          to="/login"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 py-2.5 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
        >
          Sign in instead
        </Link>
      </div>

    </div>
  );
}