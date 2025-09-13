import { expect, test } from "vitest"
import totalStayDays from "./total_stay_days"

test("calculates total stay days in date range array", () => {
  const dates = [
    { from: new Date("2025-01-01"), to: new Date("2025-01-10") },
    { from: new Date("2025-01-21"), to: new Date("2025-01-25") }
  ]

  expect(totalStayDays(dates, new Date("2025-01-30"))).toBe(15)
})

test("ignores dates without a from date", () => {
  const dates = [
    { from: undefined, to: new Date("2025-01-10") },
    { from: new Date("2025-01-21"), to: new Date("2025-01-25") }
  ]

  expect(totalStayDays(dates, new Date("2025-01-30"))).toBe(5)
})

test("ignores dates without a to date", () => {
  const dates = [
    { from: new Date("2025-01-01"), to: undefined },
    { from: new Date("2025-01-21"), to: new Date("2025-01-25") }
  ]

  expect(totalStayDays(dates, new Date("2025-01-30"))).toBe(5)
})

test("ignores dates that start after given date", () => {
  const dates = [
    { from: new Date("2025-01-01"), to: new Date("2025-01-10") },
    { from: new Date("2025-01-21"), to: new Date("2025-01-25") },
    { from: new Date("2025-01-26"), to: new Date("2025-01-30") }
  ]

  expect(totalStayDays(dates, new Date("2025-01-25"))).toBe(15)
})

test("only counts days till given date if stay is exceeds given date", () => {
  const dates = [
    { from: new Date("2025-01-01"), to: new Date("2025-01-10") },
    { from: new Date("2025-01-21"), to: new Date("2025-01-25") },
    { from: new Date("2025-01-26"), to: new Date("2025-01-30") }
  ]

  expect(totalStayDays(dates, new Date("2025-01-28"))).toBe(18)
})

test("ignores dates that end before the look back days", () => {
  const dates = [
    { from: new Date("2025-01-01"), to: new Date("2025-01-10") },
    { from: new Date("2025-01-21"), to: new Date("2025-01-25") }
  ]

  expect(totalStayDays(dates, new Date("2025-01-25"), 14)).toBe(5)
})

test("only counts days within the look back days", () => {
  const dates = [
    { from: new Date("2025-01-01"), to: new Date("2025-01-10") },
    { from: new Date("2025-01-21"), to: new Date("2025-01-25") }
  ]

  expect(totalStayDays(dates, new Date("2025-01-25"), 20)).toBe(10)
})
