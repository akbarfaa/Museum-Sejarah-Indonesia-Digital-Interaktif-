import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface ProgressState {
  visitedRooms: string[];
  inspectedArtifacts: string[];
  quizScore: number | null;
  achievements: string[];
  ticketRedeemed: boolean;
  playerName: string;
  playerAvatar: string;
}

interface ProgressContextValue extends ProgressState {
  visitRoom: (id: string) => void;
  inspectArtifact: (id: string) => void;
  setQuizScore: (n: number) => void;
  unlock: (id: string) => void;
  redeemTicket: () => void;
  setPlayerProfile: (name: string, avatar: string) => void;
  reset: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);
const STORAGE_KEY = "museumverse.progress";

const initial: ProgressState = {
  visitedRooms: [],
  inspectedArtifacts: [],
  quizScore: null,
  achievements: [],
  ticketRedeemed: false,
  playerName: "",
  playerAvatar: "batik",
};

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(initial);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...initial, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
  }, []);

  const persist = useCallback((next: ProgressState) => {
    setState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
  }, []);

  const unlock = useCallback((id: string) => {
    setState((prev) => {
      if (prev.achievements.includes(id)) return prev;
      const next = { ...prev, achievements: [...prev.achievements, id] };
      if (typeof window !== "undefined")
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const visitRoom = useCallback((id: string) => {
    setState((prev) => {
      const visited = prev.visitedRooms.includes(id)
        ? prev.visitedRooms
        : [...prev.visitedRooms, id];
      const achievements = prev.achievements.includes(id)
        ? prev.achievements
        : [...prev.achievements, id];
      const next = { ...prev, visitedRooms: visited, achievements };
      if (typeof window !== "undefined")
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const inspectArtifact = useCallback((id: string) => {
    setState((prev) => {
      if (prev.inspectedArtifacts.includes(id)) return prev;
      const next = { ...prev, inspectedArtifacts: [...prev.inspectedArtifacts, id] };
      if (typeof window !== "undefined")
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const setQuizScore = useCallback((n: number) => {
    setState((prev) => {
      const achievements = prev.achievements.includes("quiz")
        ? prev.achievements
        : [...prev.achievements, "quiz"];
      const next = { ...prev, quizScore: n, achievements };
      if (typeof window !== "undefined")
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const redeemTicket = useCallback(() => {
    setState((prev) => {
      const next = { ...prev, ticketRedeemed: true };
      if (typeof window !== "undefined")
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const setPlayerProfile = useCallback((name: string, avatar: string) => {
    setState((prev) => {
      const next = { ...prev, playerName: name, playerAvatar: avatar };
      if (typeof window !== "undefined")
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const reset = useCallback(() => persist(initial), [persist]);

  // master achievement
  useEffect(() => {
    const required = ["ancient", "kingdom", "colonial", "national", "modern", "heritage", "cinema", "quiz"];
    if (
      required.every((r) => state.achievements.includes(r)) &&
      !state.achievements.includes("master")
    ) {
      unlock("master");
    }
  }, [state.achievements, unlock]);

  const value = useMemo<ProgressContextValue>(
    () => ({ ...state, visitRoom, inspectArtifact, setQuizScore, unlock, redeemTicket, setPlayerProfile, reset }),
    [state, visitRoom, inspectArtifact, setQuizScore, unlock, redeemTicket, setPlayerProfile, reset],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used inside <ProgressProvider>");
  return ctx;
}
