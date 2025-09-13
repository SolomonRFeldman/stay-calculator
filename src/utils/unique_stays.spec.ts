import { expect, test } from "vitest"
import uniqueStays from "./unique_stays"

test("stays within stays are removed", () => {
  const stays = [
    { from: new Date(2025, 1, 1), to: new Date(2025, 1, 10) },
    { from: new Date(2025, 1, 3), to: new Date(2025, 1, 5) }
  ]

  expect(uniqueStays(stays)).toEqual([{ from: new Date(2025, 1, 1), to: new Date(2025, 1, 10) }])
})

test("overlapping stays are merged", () => {
  const stays = [
    { from: new Date(2025, 1, 1), to: new Date(2025, 1, 10) },
    { from: new Date(2025, 1, 5), to: new Date(2025, 1, 15) }
  ]

  expect(uniqueStays(stays)).toEqual([{ from: new Date(2025, 1, 1), to: new Date(2025, 1, 15) }])
})

test("order of stays does not matter", () => {
  const stays = [
    { from: new Date(2025, 1, 5), to: new Date(2025, 1, 15) },
    { from: new Date(2025, 1, 1), to: new Date(2025, 1, 10) }
  ]

  expect(uniqueStays(stays)).toEqual([{ from: new Date(2025, 1, 1), to: new Date(2025, 1, 15) }])
})

test("non-overlapping stays remain separate", () => {
  const stays = [
    { from: new Date(2025, 1, 1), to: new Date(2025, 1, 10) },
    { from: new Date(2025, 1, 15), to: new Date(2025, 1, 20) }
  ]

  expect(uniqueStays(stays)).toEqual([
    { from: new Date(2025, 1, 1), to: new Date(2025, 1, 10) },
    { from: new Date(2025, 1, 15), to: new Date(2025, 1, 20) }
  ])
})

test("touching stays are merged", () => {
  const stays = [
    { from: new Date(2025, 1, 1), to: new Date(2025, 1, 10) },
    { from: new Date(2025, 1, 10), to: new Date(2025, 1, 20) }
  ]

  expect(uniqueStays(stays)).toEqual([{ from: new Date(2025, 1, 1), to: new Date(2025, 1, 20) }])
})
