import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/lib/api";
import { useApp } from "@/contexts/AppContext";

export default function Register() {
  const navigate = useNavigate();
  const { setProfile } = useApp();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSuccess(false);

    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      setError("Username is required");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsSubmitting(true);
    try {
      const user = await registerUser(trimmedUsername, password);
      setProfile({
        userId: user.UserID,
        username: user.Username,
        startingLevel: "phonics",
        createdAt: new Date().toISOString(),
      });
      setIsSuccess(true);
      setUsername("");
      setPassword("");
      setTimeout(() => navigate("/dashboard"), 700);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-sm sm:max-w-md animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-bold text-center">Create Account</h1>
        <p className="mt-2 text-center text-muted-foreground">
          Enter your username and password to register.
        </p>

        <form className="mt-8 flex flex-col gap-3" onSubmit={handleSubmit}>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="min-h-[48px]"
            autoComplete="username"
            disabled={isSubmitting}
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="min-h-[48px]"
            autoComplete="new-password"
            disabled={isSubmitting}
          />

          {error && <p className="text-sm text-destructive">{error}</p>}
          {isSuccess && <p className="text-sm text-green-600">Account created. Redirecting...</p>}

          <Button type="submit" className="mt-2 min-h-[48px]" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Register"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="min-h-[48px]"
            disabled={isSubmitting}
            onClick={() => navigate("/")}
          >
            Back
          </Button>
        </form>
      </div>
    </div>
  );
}
