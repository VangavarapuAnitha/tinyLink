import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Urls } from "../../utils/Urls.util";

export default function RedirectHandler() {
  const { code } = useParams<{ code: string }>();

  useEffect(() => {
    if (!code) return;
    const url = Urls.redirectUrl(code);
    // Point browser to backend redirect endpoint so backend can issue 302
    window.location.href = url;
  }, [code]);

  return <div className="p-4 text-center">Redirecting…</div>;
}
