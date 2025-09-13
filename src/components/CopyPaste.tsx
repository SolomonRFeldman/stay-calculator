import {
  ClipboardDocumentListIcon,
  ClipboardDocumentCheckIcon,
  ClipboardIcon,
  ClipboardDocumentIcon
} from "@heroicons/react/24/outline"
import { Stay } from "./Stay"
import { generateStaysFromStayRanges, getStayRangesFromStays, isStayRanges } from "../hooks/use_stays"
import { readText } from "@tauri-apps/plugin-clipboard-manager"
import { useEffect, useRef, useState } from "react"

interface CopyPasteProps {
  stays: Stay[]
  setStays: (stays: Stay[]) => void
}

export default function CopyPaste({ stays, setStays }: CopyPasteProps) {
  const [recentCopy, setRecentCopy] = useState(false)
  const [recentPaste, setRecentPaste] = useState(false)
  const copyTimeoutRef = useRef<number | null>(null)
  const pasteTimeoutRef = useRef<number | null>(null)

  const handleCopy = () => {
    const stayData = JSON.stringify(getStayRangesFromStays(stays))
    void navigator.clipboard.writeText(stayData).then(() => {
      setRecentPaste(false)
      setRecentCopy(true)
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current)
      }
      copyTimeoutRef.current = setTimeout(() => {
        setRecentCopy(false)
      }, 2000)
    })
  }

  const paste = (text: string) => {
    const parsed: unknown = JSON.parse(text)
    if (isStayRanges(parsed)) {
      setStays(generateStaysFromStayRanges(parsed))
      setRecentCopy(false)
      setRecentPaste(true)
      if (pasteTimeoutRef.current) {
        clearTimeout(pasteTimeoutRef.current)
      }
      pasteTimeoutRef.current = setTimeout(() => {
        setRecentPaste(false)
      }, 2000)
    }
  }
  const handlePaste = () => {
    void readText()
      .then((text) => {
        paste(text)
      })
      .catch(() => {
        void navigator.clipboard.readText().then((text) => {
          paste(text)
        })
      })
  }

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current)
      }
      if (pasteTimeoutRef.current) {
        clearTimeout(pasteTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="flex gap-2">
      <button className="btn btn-small" onClick={handleCopy}>
        {recentCopy ? <Copied /> : <Copy />}
      </button>
      <button className="btn btn-small" onClick={handlePaste}>
        {recentPaste ? <Pasted /> : <Paste />}
      </button>
    </div>
  )
}

const Copy = () => (
  <>
    <ClipboardIcon className="size-5" />
    Copy
  </>
)

const Copied = () => (
  <>
    <ClipboardDocumentIcon className="size-5" />
    Copied
  </>
)

const Paste = () => (
  <>
    <ClipboardDocumentListIcon className="size-5" />
    Paste
  </>
)

const Pasted = () => (
  <>
    <ClipboardDocumentCheckIcon className="size-5" />
    Pasted
  </>
)
