# Directus Configuration Guide

Step-by-step instructions to configure Directus collections for the Haringey Baháʼí Community website.

**Directus URL**: https://haringey-directus.onrender.com

---

## Collection Creation Order

We'll create collections in this order:
1. **Prayers** (most used, simplest structure)
2. **Events** (calendar functionality)
3. **Writings** (sacred texts)
4. **Resources** (downloadable files)
5. **News** (blog posts)
6. **Pages** (static content)

---

## 1. Create Prayers Collection

### Step 1.1: Create Collection

1. Click **Settings** (⚙️ icon) in left sidebar
2. Click **Data Model**
3. Click **+ Create Collection**
4. Configure:
   - **Collection Name**: `prayers`
   - **Primary Key Field**: Keep default (`id`, UUID)
   - **Type**: `Standard Collection`
   - **Optional System Fields**: Check ALL boxes:
     - ✅ Status
     - ✅ Created On
     - ✅ Created By
     - ✅ Updated On
     - ✅ Updated By
     - ✅ Sort
5. Click **✓** (checkmark at top right) to save

### Step 1.2: Add Fields to Prayers Collection

Click on **prayers** collection, then click **+ Create Field** for each field below:

#### Field 1: title

- **Type**: `String` (click "Standard" tab → "String")
- **Field Name**: `title`
- **Interface**: `Input`
- Click **Continue**
- **Required**: ✅ Check
- **Note/Placeholder**: "Prayer title (e.g., Prayer for Humanity)"
- Click **✓** to save

#### Field 2: author

- **Type**: `String`
- **Field Name**: `author`
- **Interface**: `Input`
- Click **Continue**
- **Required**: ✅ Check
- **Note/Placeholder**: "Author name (e.g., Baháʼu'lláh, ʻAbdu'l-Bahá)"
- Click **✓** to save

#### Field 3: category

- **Type**: `String`
- **Field Name**: `category`
- **Interface**: `Select Dropdown`
- Click **Continue**
- **Required**: ✅ Check
- **Dropdown Choices** (click "+ Add New" for each):
  - `General`
  - `Morning`
  - `Evening`
  - `Healing`
  - `Children`
  - `Departed`
  - `Unity`
  - `Assistance`
- **Default Value**: `General`
- Click **✓** to save

#### Field 4: text

- **Type**: `Text`
- **Field Name**: `text`
- **Interface**: `WYSIWYG` (Rich Text Editor)
- Click **Continue**
- **Required**: ✅ Check
- **Editor Toolbar**: Enable markdown options
- **Note**: "Full prayer text (supports Markdown)"
- Click **✓** to save

#### Field 5: tags

- **Type**: `JSON`
- **Field Name**: `tags`
- **Interface**: `Tags`
- Click **Continue**
- **Required**: ❌ Leave unchecked
- **Note**: "Keywords for filtering (e.g., unity, peace, healing)"
- Click **✓** to save

#### Field 6: language

- **Type**: `String`
- **Field Name**: `language`
- **Interface**: `Select Dropdown` (or use Language interface if available)
- Click **Continue**
- **Required**: ✅ Check
- **Dropdown Choices**:
  - `en` (English)
  - `es` (Spanish)
  - `fr` (French)
  - `ar` (Arabic)
  - `fa` (Persian)
- **Default Value**: `en`
- Click **✓** to save

#### Field 7: translation_of (Optional - for Phase 3)

- **Type**: `UUID`
- **Field Name**: `translation_of`
- **Interface**: `Select Dropdown (from Items)`
- Click **Continue**
- **Related Collection**: `prayers` (self-referencing)
- **Required**: ❌ Leave unchecked
- **Note**: "Link to original prayer if this is a translation"
- Click **✓** to save

---

## 2. Create Events Collection

### Step 2.1: Create Collection

1. Click **+ Create Collection** (in Data Model)
2. Configure:
   - **Collection Name**: `events`
   - **Primary Key Field**: Keep default (`id`, UUID)
   - **Optional System Fields**: Check ALL boxes
3. Click **✓** to save

### Step 2.2: Add Fields to Events Collection

#### Field 1: title

- **Type**: `String`
- **Field Name**: `title`
- **Interface**: `Input`
- **Required**: ✅ Check
- **Note**: "Event title (e.g., Nineteen-Day Feast — Devotional)"

#### Field 2: description

- **Type**: `Text`
- **Field Name**: `description`
- **Interface**: `Textarea` or `WYSIWYG`
- **Required**: ✅ Check
- **Note**: "Event description (supports Markdown)"

#### Field 3: start_datetime

- **Type**: `Timestamp`
- **Field Name**: `start_datetime`
- **Interface**: `Datetime`
- **Required**: ✅ Check
- **Include Time**: ✅ Check
- **Note**: "Event start date and time"

#### Field 4: end_datetime

- **Type**: `Timestamp`
- **Field Name**: `end_datetime`
- **Interface**: `Datetime`
- **Required**: ✅ Check
- **Include Time**: ✅ Check
- **Note**: "Event end date and time"

#### Field 5: location

- **Type**: `String`
- **Field Name**: `location`
- **Interface**: `Input`
- **Required**: ✅ Check
- **Note**: "Physical location or 'Online'"

#### Field 6: is_public

- **Type**: `Boolean`
- **Field Name**: `is_public`
- **Interface**: `Toggle`
- **Required**: ✅ Check
- **Default Value**: `true`
- **Note**: "Public events shown to all visitors"

#### Field 7: registration_link

- **Type**: `String`
- **Field Name**: `registration_link`
- **Interface**: `Input`
- **Required**: ❌
- **Note**: "Optional external registration URL"

#### Field 8: category

- **Type**: `String`
- **Field Name**: `category`
- **Interface**: `Select Dropdown`
- **Required**: ❌
- **Dropdown Choices**:
  - `Devotional`
  - `Study`
  - `Children`
  - `Youth`
  - `Social`
  - `Interfaith`
- **Default Value**: `Devotional`

#### Field 9: image (Optional)

- **Type**: `UUID`
- **Field Name**: `image`
- **Interface**: `File`
- **Required**: ❌
- **Note**: "Featured image for event"
- **File Selection**: Single file
- **Allowed Types**: Images only

---

## 3. Create Writings Collection

### Step 3.1: Create Collection

1. Click **+ Create Collection**
2. Configure:
   - **Collection Name**: `writings`
   - **Primary Key Field**: Keep default (`id`, UUID)
   - **Optional System Fields**: Check ALL boxes
3. Click **✓** to save

### Step 3.2: Add Fields to Writings Collection

#### Field 1: title

- **Type**: `String`
- **Field Name**: `title`
- **Interface**: `Input`
- **Required**: ✅ Check
- **Note**: "Full title (e.g., The Hidden Words)"

#### Field 2: short_title

- **Type**: `String`
- **Field Name**: `short_title`
- **Interface**: `Input`
- **Required**: ✅ Check
- **Note**: "Abbreviated title (e.g., Hidden Words)"

#### Field 3: author

- **Type**: `String`
- **Field Name**: `author`
- **Interface**: `Input`
- **Required**: ✅ Check

#### Field 4: category

- **Type**: `String`
- **Field Name**: `category`
- **Interface**: `Select Dropdown`
- **Required**: ✅ Check
- **Dropdown Choices**:
  - `Scripture`
  - `Compilation`
  - `Commentary`
  - `Historical`

#### Field 5: excerpt

- **Type**: `Text`
- **Field Name**: `excerpt`
- **Interface**: `Textarea`
- **Required**: ✅ Check
- **Note**: "Brief introduction or summary"

#### Field 6: text

- **Type**: `Text`
- **Field Name**: `text`
- **Interface**: `WYSIWYG`
- **Required**: ❌
- **Note**: "Full text content (optional - may link externally)"

#### Field 7: tags

- **Type**: `JSON`
- **Field Name**: `tags`
- **Interface**: `Tags`
- **Required**: ❌

#### Field 8: language

- **Type**: `String`
- **Field Name**: `language`
- **Interface**: `Select Dropdown`
- **Required**: ✅ Check
- **Default Value**: `en`

#### Field 9: external_link

- **Type**: `String`
- **Field Name**: `external_link`
- **Interface**: `Input`
- **Required**: ❌
- **Note**: "Link to official Baháʼí reference library"

---

## 4. Create Resources Collection

### Step 4.1: Create Collection

1. Click **+ Create Collection**
2. Configure:
   - **Collection Name**: `resources`
   - **Primary Key Field**: Keep default (`id`, UUID)
   - **Optional System Fields**: Check ALL boxes
3. Click **✓** to save

### Step 4.2: Add Fields to Resources Collection

#### Field 1: title

- **Type**: `String`
- **Field Name**: `title`
- **Interface**: `Input`
- **Required**: ✅ Check
- **Note**: "Resource title (e.g., Ruhi Book 1)"

#### Field 2: type

- **Type**: `String`
- **Field Name**: `type`
- **Interface**: `Select Dropdown`
- **Required**: ✅ Check
- **Dropdown Choices**:
  - `pdf`
  - `audio`
  - `video`
  - `link`

#### Field 3: description

- **Type**: `Text`
- **Field Name**: `description`
- **Interface**: `Textarea`
- **Required**: ✅ Check
- **Note**: "Brief description of the resource"

#### Field 4: file

- **Type**: `UUID`
- **Field Name**: `file`
- **Interface**: `File`
- **Required**: ❌
- **Note**: "Upload file (PDF, audio, video)"
- **File Selection**: Single file

#### Field 5: file_url

- **Type**: `String`
- **Field Name**: `file_url`
- **Interface**: `Input`
- **Required**: ❌
- **Note**: "External URL if not uploaded to Directus"

#### Field 6: tags

- **Type**: `JSON`
- **Field Name**: `tags`
- **Interface**: `Tags`
- **Required**: ❌

#### Field 7: category

- **Type**: `String`
- **Field Name**: `category`
- **Interface**: `Select Dropdown`
- **Required**: ✅ Check
- **Dropdown Choices**:
  - `Study Materials`
  - `Audio`
  - `Video`
  - `Teaching Materials`

#### Field 8: language

- **Type**: `String`
- **Field Name**: `language`
- **Interface**: `Select Dropdown`
- **Required**: ✅ Check
- **Default Value**: `en`

---

## 5. Import Sample Data

After creating the collections, let's add one sample prayer to test:

### Add Sample Prayer

1. Click **Content** in left sidebar
2. Click **prayers** collection
3. Click **+ Create Item**
4. Fill in:
   - **Status**: `Published`
   - **Title**: `Prayer for Humanity`
   - **Author**: `Baháʼu'lláh`
   - **Category**: `General`
   - **Text**: Copy the text from `/home/kaihaan/projects/haringeyweb/src/content/prayers/prayer-for-humanity.md`
   - **Tags**: Add: `unity`, `peace`, `humanity`
   - **Language**: `en`
5. Click **✓** to save

---

## 6. Create API Token

To connect your Astro site to Directus, you need an API token:

1. Click **Settings** (⚙️) → **Access Tokens**
2. Click **+ Create Token**
3. Configure:
   - **Name**: `Website Read Token`
   - **Type**: `Static Token`
   - **Expires**: Never
   - **Permissions**: Read-only for published content
4. Click **✓** to save
5. **Copy the token** - you'll need this for the `.env` file

---

## 7. Configure Permissions

For public API access (so your website can fetch content):

1. Click **Settings** → **Roles & Permissions**
2. Click on **Public** role
3. For each collection (prayers, events, writings, resources):
   - **Read**: ✅ Check
   - **Rule**: Status equals `published`
4. Click **✓** to save

---

## Next Steps

Once you've:
- ✅ Created the prayers collection with fields
- ✅ Created the events collection with fields
- ✅ Added at least one sample prayer
- ✅ Created an API token
- ✅ Configured public permissions

Let me know and I'll help you:
1. Update the local `.env` file with Directus credentials
2. Implement the API client functions
3. Migrate the prayers page to use Directus

---

**Tip**: You don't need to create all collections at once. Start with prayers and events, get those working on the website, then add the rest later.
