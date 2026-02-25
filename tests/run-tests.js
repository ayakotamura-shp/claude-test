#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

let testsPassed = 0;
let testsFailed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
    testsPassed++;
  } catch (error) {
    console.log(`❌ ${name}`);
    console.log(`   Error: ${error.message}`);
    testsFailed++;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

// Read index.html
const htmlPath = path.join(__dirname, '..', 'index.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

console.log('🔍 Running Fortune App Tests...\n');

// Test 1: Check for buttons
test('Main button with class "btn-fortune" exists', () => {
  assert(htmlContent.includes('class="btn-fortune"'), 'Button with class btn-fortune not found');
  assert(htmlContent.includes('占う'), 'Button text "占う" not found');
});

// Test 2: Check for category buttons
test('Category buttons exist', () => {
  assert(htmlContent.includes('class="category-btn'), 'Category buttons not found');
  assert(htmlContent.includes('data-category="all"'), 'Category "all" not found');
  assert(htmlContent.includes('data-category="love"'), 'Category "love" not found');
  assert(htmlContent.includes('data-category="work"'), 'Category "work" not found');
  assert(htmlContent.includes('data-category="health"'), 'Category "health" not found');
  assert(htmlContent.includes('data-category="money"'), 'Category "money" not found');
});

// Test 3: Check button styling (pink gradient expected)
test('Button styling with gradient background', () => {
  assert(htmlContent.includes('.btn-fortune'), '.btn-fortune class not found');
  assert(htmlContent.includes('linear-gradient(135deg, #FFB3D9 0%, #D8BFD8 100%)'), 'Gradient color not found');
  assert(htmlContent.includes('background: linear-gradient(135deg, #FFB3D9 0%, #D8BFD8 100%)'), 'Button gradient not found');
});

// Test 4: Check button hover effect
test('Button has hover effect', () => {
  assert(htmlContent.includes('.btn-fortune:hover'), ':hover state not found');
  assert(htmlContent.includes('transform: translateY(-3px)'), 'Hover transform effect not found');
});

// Test 5: Check for fortune display element
test('Fortune display element exists', () => {
  assert(htmlContent.includes('class="fortune-display'), 'Fortune display not found');
  assert(htmlContent.includes('id="fortune-text"'), 'Fortune text element not found');
  assert(htmlContent.includes('id="emoji"'), 'Emoji element not found');
});

// Test 6: Check for luck level display
test('Luck level stars exist', () => {
  assert(htmlContent.includes('class="luck-level"'), 'Luck level container not found');
  assert(htmlContent.includes('.star'), 'Star CSS class not defined');
  assert(htmlContent.includes('⭐'), 'Star emoji not found');
});

// Test 7: Check fortune data exists
test('Fortune data for all categories', () => {
  assert(htmlContent.includes('all:'), 'All fortunes not found');
  assert(htmlContent.includes('love:'), 'Love fortunes not found');
  assert(htmlContent.includes('work:'), 'Work fortunes not found');
  assert(htmlContent.includes('health:'), 'Health fortunes not found');
  assert(htmlContent.includes('money:'), 'Money fortunes not found');
});

// Test 8: Check event listeners
test('Event listener for fortune button', () => {
  assert(htmlContent.includes('fortuneButton.addEventListener'), 'Fortune button event listener not found');
  assert(htmlContent.includes('click'), 'Click event handler not found');
});

// Test 9: Check category button event handlers
test('Event listener for category buttons', () => {
  assert(htmlContent.includes('categoryButtons.forEach'), 'Category button event listeners not found');
  assert(htmlContent.includes('currentCategory'), 'currentCategory variable not found');
});

// Test 10: Check for animations
test('Animation effects exist', () => {
  assert(htmlContent.includes('@keyframes fadeIn'), 'FadeIn animation not found');
  assert(htmlContent.includes('@keyframes sparkleAnimation'), 'Sparkle animation not found');
});

// Test 11: Check responsive design
test('Mobile responsive styles exist', () => {
  assert(htmlContent.includes('@media (max-width: 480px)'), 'Mobile media query not found');
});

// Test 12: Check for proper color contrast
test('Color values are valid', () => {
  assert(htmlContent.includes('#FFB3D9') || htmlContent.includes('#ffb3d9'), 'Pink color not found');
  assert(htmlContent.includes('#D8BFD8') || htmlContent.includes('#d8bfd8'), 'Thistle color not found');
  assert(htmlContent.includes('#FFFFFF') || htmlContent.includes('white'), 'White color not found');
});

// Test 13: Check for sparkle effect
test('Sparkle effect implementation', () => {
  assert(htmlContent.includes('createSparkles'), 'Sparkle function not found');
  assert(htmlContent.includes('sparkleAnimation'), 'Sparkle animation class not found');
});

// Test 14: Check for proper HTML structure
test('HTML structure is valid', () => {
  assert(htmlContent.includes('<!DOCTYPE html>'), 'DOCTYPE not found');
  assert(htmlContent.includes('<html lang="ja">'), 'HTML tag with lang not found');
  assert(htmlContent.includes('<meta charset="UTF-8">'), 'Charset meta tag not found');
  assert(htmlContent.includes('<meta name="viewport"'), 'Viewport meta tag not found');
});

// Summary
console.log('\n' + '='.repeat(50));
console.log(`Tests Passed: ${testsPassed} ✅`);
console.log(`Tests Failed: ${testsFailed} ❌`);
console.log('='.repeat(50));

process.exit(testsFailed > 0 ? 1 : 0);
