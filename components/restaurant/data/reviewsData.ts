/**
 * Curry & Spice — customer reviews.
 * Written in a mix of tones to feel like a real Google review feed.
 */

export interface Review {
  id: string;
  name: string;
  /** Two-letter initials for the avatar chip. */
  initials: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string;
  quote: string;
  verified: boolean;
  /** Accent color for the initials avatar. */
  avatar: string;
}

export const REVIEWS: Review[] = [
  {
    id: "r1",
    name: "Marcus Reyes",
    initials: "MR",
    rating: 5,
    date: "2 weeks ago",
    quote:
      "The butter chicken is the best I've had outside of India, full stop. Rich, smoky, not too sweet. We came for a birthday and left feeling like family. Already booked our next visit.",
    verified: true,
    avatar: "#C7401A",
  },
  {
    id: "r2",
    name: "Priya Anand",
    initials: "PA",
    rating: 5,
    date: "1 month ago",
    quote:
      "As someone who grew up on my mom's Punjabi cooking, this place passes the test. The dal makhani tastes like it was simmered all day — because it was. Cozy room, warm staff.",
    verified: true,
    avatar: "#4A6B4E",
  },
  {
    id: "r3",
    name: "Jenna Whitfield",
    initials: "JW",
    rating: 5,
    date: "3 weeks ago",
    quote:
      "First time trying Indian food and the team walked me through the spice levels so patiently. Ended up loving the paneer tikka masala. The mango lassi is dangerously good.",
    verified: true,
    avatar: "#E8A548",
  },
  {
    id: "r4",
    name: "Devon Clarke",
    initials: "DC",
    rating: 4,
    date: "1 week ago",
    quote:
      "Genuinely excellent food and the biryani is a showstopper. Took off one star only because we waited a bit for a table on a Friday — worth it, but call ahead.",
    verified: true,
    avatar: "#2A2420",
  },
  {
    id: "r5",
    name: "Sofia Marchetti",
    initials: "SM",
    rating: 5,
    date: "2 months ago",
    quote:
      "We do date night here almost every month now. It's special without being stuffy. The Rogan Josh falls apart at the touch of a fork. Chef Priya stopped by our table — such a lovely touch.",
    verified: true,
    avatar: "#C7401A",
  },
  {
    id: "r6",
    name: "Aaron Blake",
    initials: "AB",
    rating: 5,
    date: "5 days ago",
    quote:
      "Ordered pickup for the family and everything was still hot and packed beautifully. Kids devoured the cheesy naan fingers. This is our new Tuesday-night regular.",
    verified: true,
    avatar: "#4A6B4E",
  },
];

export const REVIEW_SUMMARY = {
  rating: 4.8,
  count: 847,
  breakdown: [
    { stars: 5, pct: 82 },
    { stars: 4, pct: 12 },
    { stars: 3, pct: 4 },
    { stars: 2, pct: 1 },
    { stars: 1, pct: 1 },
  ],
} as const;
