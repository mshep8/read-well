import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/lib/api";
import { useApp } from "@/contexts/AppContext";

export default function Login() {
  const navigate = useNavigate();
  const { state, setProfile } = useApp();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      setError("Username is required");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    setIsSubmitting(true);
    try {
      const user = await loginUser(trimmedUsername, password);
      setProfile({
        userId: user.UserID,
        username: user.Username,
        startingLevel: state.profile?.startingLevel ?? "phonics",
        createdAt: state.profile?.createdAt ?? new Date().toISOString(),
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-sm sm:max-w-md animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-bold text-center">Login</h1>
        <p className="mt-2 text-center text-muted-foreground">
          Enter your username and password.
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
            autoComplete="current-password"
            disabled={isSubmitting}
          />

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="mt-2 min-h-[48px]" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Login"}
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
