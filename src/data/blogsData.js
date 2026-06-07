/**
 * blogsData.js
 *
 * Add your blog posts here. Each object becomes a card on /blogs
 * and a full post at /blogs/:slug.
 *
 * Fields:
 *   slug        — URL-safe identifier (must be unique)
 *   title       — Post heading
 *   excerpt     — Short description shown on the card
 *   date        — e.g. "June 1, 2026"
 *   readTime    — e.g. "5 min read"
 *   tags        — array of tag strings
 *   coverEmoji  — single emoji used as the cover accent (no image needed)
 *   content     — Full markdown-style content string (supports **bold**, _italic_,
 *                 ## headings, ``` code blocks, and > blockquotes via simple renderer)
 */

export const blogs = [
  {
  slug: "my-leetcode-grind-journey",
  title: "My LeetCode Grind: Restarting DSA the Right Way",
  excerpt:
    "How I stopped overthinking DSA, built consistency, and started solving problems daily without burning out.",
  date: "June 1, 2026",
  readTime: "5 min read",
  tags: ["LeetCode", "DSA", "Python"],
  coverEmoji: "🧠",
  content: `## Starting again from zero

I had already learned DSA before, but like most people, I stopped practicing consistently. When I came back, I realized something important:

> You do not fail at DSA because it is hard. You fail because you disappear for weeks.

So instead of jumping into hard problems, I restarted with the basics.

## My current approach

I now focus on:
- Arrays
- HashMaps
- Strings
- Two pointers
- Sliding window

And most importantly — consistency over difficulty.

## The biggest mindset shift

Earlier, I used to think:
"How do I solve this problem perfectly?"

Now I think:
"Can I understand why this solution works?"

That single change made learning much easier.

## Why I use Python for LeetCode

Python removes unnecessary syntax stress and lets me focus on logic.

\`\`\`python
freq = {}

for char in word:
    freq[char] = freq.get(char, 0) + 1
\`\`\`

Simple, readable, fast to write.

## What I learned from grinding daily

- Repeating patterns matter more than memorizing answers.
- Easy questions build confidence.
- Time complexity becomes natural after enough repetition.
- Consistency beats motivation every time.

Right now, the goal is simple:
Solve problems daily and slowly become harder to break.`,
},

{
  slug: "learning-programming-languages",
  title: "How I Learn New Programming Languages Without Getting Overwhelmed",
  excerpt:
    "My practical method for learning languages faster by focusing on patterns instead of syntax.",
  date: "May 28, 2026",
  readTime: "6 min read",
  tags: ["Programming", "Learning", "JavaScript"],
  coverEmoji: "💻",
  content: `## The mistake beginners make

Most people try to memorize an entire language before building anything.

That approach almost always fails.

Programming languages are tools — you learn them best by using them.

## My learning process

Whenever I start a new language, I only focus on:
- Variables
- Functions
- Loops
- Conditions
- Arrays/Objects
- APIs
- File structure

Once these basics are clear, everything else becomes easier.

## Patterns matter more than syntax

Every language has:
- Variables
- Functions
- Loops
- Conditions
- Data structures

The syntax changes.
The logic stays the same.

For example:

\`\`\`js
for (let i = 0; i < 5; i++) {
  console.log(i);
}
\`\`\`

and

\`\`\`python
for i in range(5):
    print(i)
\`\`\`

Different syntax.
Same thinking.

## Build while learning

The fastest way I learn is by building small projects immediately.

Some examples:
- Todo app
- Weather app
- Portfolio site
- API project
- Authentication system

Projects expose the gaps in your knowledge much faster than tutorials.

## Tutorials are dangerous

Tutorials feel productive because you are watching progress happen.

But real learning starts when:
- the tutorial ends
- errors appear
- nothing works
- and you still continue building

That struggle is where growth happens.

## My current focus

Right now I am learning deeper frontend architecture, React Native, and exploring lower-level concepts step by step.

The goal is not to know every language.

The goal is to become adaptable enough to learn anything quickly.`,
},

{
  slug: "my-blockchain-journey",
  title: "My Blockchain Journey: From Curiosity to Building",
  excerpt:
    "Exploring blockchain beyond hype — wallets, smart contracts, decentralization, and why the technology fascinated me.",
  date: "May 18, 2026",
  readTime: "7 min read",
  tags: ["Blockchain", "Web3", "Technology"],
  coverEmoji: "⛓️",
  content: `## How I got interested in blockchain

At first, blockchain looked confusing.

There were too many buzzwords:
- Crypto
- NFTs
- Smart contracts
- DAOs
- Web3

But once I ignored the hype and focused on the technology itself, things started making sense.

## The idea that hooked me

The concept of decentralized systems fascinated me.

Instead of one company controlling everything, blockchain distributes trust across a network.

That idea alone changed how I looked at software.

## Learning the basics first

Before touching smart contracts, I learned:
- How wallets work
- Public and private keys
- Transactions
- Gas fees
- Blocks and validation

Without understanding these fundamentals, everything else feels magical and confusing.

## Smart contracts felt powerful

Writing logic that runs on a blockchain feels different from normal backend development.

You cannot casually "fix it later" after deployment.

That forces you to think carefully about:
- Security
- Immutability
- Efficiency

## The reality of Web3

Blockchain is not perfect.

There are real problems:
- Scams
- Overhype
- Expensive transactions
- Poor user experience

But the underlying technology is still incredibly interesting.

## What I want to explore next

I want to go deeper into:
- Solidity
- Smart contract security
- Layer 2 scaling
- Decentralized apps
- Blockchain infrastructure

Right now, I am still learning step by step and building small experiments to understand the ecosystem better.

And honestly, that is the fun part.`,
},
];
