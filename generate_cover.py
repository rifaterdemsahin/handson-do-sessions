import os
from PIL import Image, ImageDraw, ImageFont

WIDTH = 1460
HEIGHT = 752

bg_path = "/Users/rifaterdemsahin/.gemini/antigravity-cli/brain/9a45c3fe-7c53-4e65-9daf-cb7013237ec2/hands_on_cover_1789632487339.jpg"

if not os.path.exists(bg_path):
    print("Background image not found, creating synthetic backdrop...")
    base = Image.new("RGBA", (WIDTH, HEIGHT), (15, 23, 42, 255))
else:
    orig = Image.open(bg_path).convert("RGBA")
    # Resize and crop to fill 1460x752 exactly
    orig_ratio = orig.width / orig.height
    target_ratio = WIDTH / HEIGHT
    
    if orig_ratio > target_ratio:
        new_height = HEIGHT
        new_width = int(orig_ratio * HEIGHT)
    else:
        new_width = WIDTH
        new_height = int(WIDTH / orig_ratio)
        
    resized = orig.resize((new_width, new_height), Image.Resampling.LANCZOS)
    left = (new_width - WIDTH) // 2
    top = (new_height - HEIGHT) // 2
    base = resized.crop((left, top, left + WIDTH, top + HEIGHT))

# Create sophisticated dark gradient overlay
overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
draw_overlay = ImageDraw.Draw(overlay)

# Left dark vignette for text readability
for x in range(WIDTH):
    alpha = int(245 * (1.0 - (x / WIDTH) ** 0.52))
    if alpha > 0:
        draw_overlay.line([(x, 0), (x, HEIGHT)], fill=(15, 23, 42, min(245, alpha)))

# Bottom dark bar gradient
for y in range(HEIGHT - 220, HEIGHT):
    progress = (y - (HEIGHT - 220)) / 220.0
    alpha = int(245 * (progress ** 1.3))
    draw_overlay.line([(0, y), (WIDTH, y)], fill=(10, 15, 30, alpha))

# Top subtle shadow
for y in range(120):
    alpha = int(140 * (1.0 - y / 120))
    draw_overlay.line([(0, y), (WIDTH, y)], fill=(10, 15, 30, alpha))

# Composite base and overlay
composite = Image.alpha_composite(base, overlay)
draw = ImageDraw.Draw(composite)

# Fonts
font_title_path = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
if not os.path.exists(font_title_path):
    font_title_path = "/System/Library/Fonts/HelveticaNeue.ttc"

try:
    font_badge = ImageFont.truetype(font_title_path, 20)
    font_title = ImageFont.truetype(font_title_path, 66)
    font_sub = ImageFont.truetype(font_title_path, 28)
    font_tag = ImageFont.truetype(font_title_path, 22)
    font_tier = ImageFont.truetype(font_title_path, 21)
    font_meta = ImageFont.truetype(font_title_path, 18)
    font_footer = ImageFont.truetype(font_title_path, 19)
except Exception as e:
    print(f"Font loading error: {e}")
    font_badge = ImageFont.load_default()
    font_title = ImageFont.load_default()
    font_sub = ImageFont.load_default()
    font_tag = ImageFont.load_default()
    font_tier = ImageFont.load_default()
    font_meta = ImageFont.load_default()
    font_footer = ImageFont.load_default()

# 1. Top Left Badge: RECORDED SESSIONS • ASYNCHRONOUS VAULT
badge_text = "RECORDED SESSIONS  •  ASYNCHRONOUS VAULT"
bx, by = 80, 68
badge_padding_x = 22
badge_padding_y = 10
bbox = draw.textbbox((bx, by), badge_text, font=font_badge)
bw = bbox[2] - bbox[0] + badge_padding_x * 2 + 18
bh = bbox[3] - bbox[1] + badge_padding_y * 2

# Draw rounded badge background
draw.rounded_rectangle([bx, by, bx + bw, by + bh], radius=18, fill=(30, 27, 75, 235), outline=(129, 140, 248, 255), width=2)
# Draw pulsing green dot
draw.ellipse([bx + 18, by + bh // 2 - 5, bx + 28, by + bh // 2 + 5], fill=(52, 211, 153, 255))
draw.text((bx + 36, by + badge_padding_y - 1), badge_text, font=font_badge, fill=(224, 231, 255, 255))

# 2. Main Title: HANDS-ON DO SESSIONS
title_x = 80
title_y = 142
# Drop shadow
draw.text((title_x + 3, title_y + 4), "HANDS-ON DO SESSIONS", font=font_title, fill=(5, 10, 25, 255))
draw.text((title_x, title_y), "HANDS-ON DO SESSIONS", font=font_title, fill=(255, 255, 255, 255))

# 3. Accent Subtitle
sub_y = title_y + 90
sub_text = "Building in the Age of AI • Real Repositories Deconstructed"
draw.text((title_x + 2, sub_y + 2), sub_text, font=font_sub, fill=(10, 15, 30, 240))
draw.text((title_x, sub_y), sub_text, font=font_sub, fill=(147, 197, 253, 255))

# 4. Hardware Mandate
tag_y = sub_y + 46
tag_text = "Shot Live on Mac Pro Workstation  •  Sony ZV-1  •  Focusrite Audio"
draw.text((title_x, tag_y), tag_text, font=font_tag, fill=(203, 213, 225, 255))

# 5. Three-Tier Category Cards
tiers = [
    ("LEVEL 1: BEGINNER", (16, 185, 129), "Prompt-to-Spec & Repos"),
    ("LEVEL 2: INTERMEDIATE", (245, 158, 11), "Tool Routing & Boundaries"),
    ("LEVEL 3: ADVANCED", (239, 68, 68), "Multi-Agent Orchestration")
]

tier_start_x = 80
tier_y = 430
card_w = 340
card_h = 105
spacing = 25

for i, (title, color, desc) in enumerate(tiers):
    cx = tier_start_x + i * (card_w + spacing)
    # Card background
    draw.rounded_rectangle([cx, tier_y, cx + card_w, tier_y + card_h], radius=14, fill=(15, 23, 42, 240), outline=(51, 65, 85, 255), width=2)
    # Accent top border
    draw.rounded_rectangle([cx, tier_y, cx + card_w, tier_y + 6], radius=4, fill=color)
    # Drawn dot indicator
    draw.ellipse([cx + 20, tier_y + 26, cx + 32, tier_y + 38], fill=color)
    # Title
    draw.text((cx + 42, tier_y + 22), title, font=font_tier, fill=(255, 255, 255, 255))
    # Description
    draw.text((cx + 20, tier_y + 60), desc, font=font_meta, fill=(148, 163, 184, 255))

# 6. Bottom Meta Banner Bar
footer_y = HEIGHT - 80
draw.line([(80, footer_y - 18), (WIDTH - 80, footer_y - 18)], fill=(51, 65, 85, 220), width=1)

items = [
    ("GITHUB: github.com/rifaterdemsahin", (203, 213, 225)),
    ("VAULT: Skool Community Archive", (199, 210, 254)),
    ("RESOLUTION: 1460 x 752 px (Course Cover)", (251, 191, 36))
]

cur_x = 80
for idx, (label, col) in enumerate(items):
    draw.text((cur_x, footer_y), label, font=font_footer, fill=col)
    bbox = draw.textbbox((cur_x, footer_y), label, font=font_footer)
    cur_x = bbox[2]
    if idx < len(items) - 1:
        draw.text((cur_x + 18, footer_y), "•", font=font_footer, fill=(100, 116, 139))
        cur_x += 42

os.makedirs("assets", exist_ok=True)
composite.convert("RGB").save("assets/cover-1460x752.png", "PNG", quality=95)
composite.convert("RGB").save("cover.png", "PNG", quality=95)
composite.convert("RGB").save("assets/cover-1460x752.jpg", "JPEG", quality=92)
composite.convert("RGB").save("cover.jpg", "JPEG", quality=92)

print("Cover images re-generated cleanly without square artifacts.")
