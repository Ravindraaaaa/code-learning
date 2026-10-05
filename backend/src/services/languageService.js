import { Language, User } from '../models/index.js';
import { isDBConnected } from '../config/db.js';

/**
 * Standard CodeForge Platform Programming Languages
 * Adheres strictly to: C, C++, Java, Python, JavaScript
 */
export const DEFAULT_LANGUAGES = [
  {
    name: 'C',
    slug: 'c',
    version: 'GCC 13.2',
    fileExtension: '.c',
    monacoMode: 'c',
    displayOrder: 1,
    description: 'High-performance procedural programming language ideal for low-level systems, memory mastery, and embedded computing.',
    defaultTemplate: `#include <stdio.h>

int main() {
    printf("Hello, CodeForge!\\n");
    return 0;
}
`,
    isActive: true,
  },
  {
    name: 'C++',
    slug: 'cpp',
    version: 'G++ 13.2 / C++20',
    fileExtension: '.cpp',
    monacoMode: 'cpp',
    displayOrder: 2,
    description: 'Blazing-fast systems and competitive programming language featuring rich Standard Template Library (STL) data structures.',
    defaultTemplate: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    cout << "Hello, CodeForge!" << endl;
    return 0;
}
`,
    isActive: true,
  },
  {
    name: 'Java',
    slug: 'java',
    version: 'OpenJDK 21 LTS',
    fileExtension: '.java',
    monacoMode: 'java',
    displayOrder: 3,
    description: 'Robust, statically typed, cross-platform enterprise language widely used in industry and large-scale applications.',
    defaultTemplate: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, CodeForge!");
    }
}
`,
    isActive: true,
  },
  {
    name: 'Python',
    slug: 'python',
    version: 'Python 3.12',
    fileExtension: '.py',
    monacoMode: 'python',
    displayOrder: 4,
    description: 'Versatile, highly readable high-level language popular for algorithms, automation, data science, and scripting.',
    defaultTemplate: `def main():
    print("Hello, CodeForge!")

if __name__ == "__main__":
    main()
`,
    isActive: true,
  },
  {
    name: 'JavaScript',
    slug: 'javascript',
    version: 'Node.js 20 LTS',
    fileExtension: '.js',
    monacoMode: 'javascript',
    displayOrder: 5,
    description: 'Universal dynamic language powering modern web applications, full-stack systems, and asynchronous runtimes.',
    defaultTemplate: `function main() {
    console.log("Hello, CodeForge!");
}

main();
`,
    isActive: true,
  },
];

/**
 * Idempotently ensure the 5 canonical programming languages exist in the database.
 * Does NOT seed fake student data.
 */
export const ensureDefaultLanguages = async () => {
  if (!isDBConnected()) return DEFAULT_LANGUAGES;

  try {
    for (const lang of DEFAULT_LANGUAGES) {
      await Language.findOneAndUpdate(
        { slug: lang.slug },
        { $setOnInsert: lang },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
  } catch (err) {
    // If concurrent initialization occurs, continue safely
  }
};

/**
 * Retrieve all available programming languages.
 *
 * @param {Object} options
 * @param {boolean} options.activeOnly - Filter by isActive flag
 * @returns {Promise<Array>} List of languages
 */
export const getAllLanguages = async ({ activeOnly = true } = {}) => {
  if (!isDBConnected()) {
    const error = new Error('Database service is currently unavailable. Please verify MongoDB is running.');
    error.statusCode = 503;
    throw error;
  }

  // Ensure catalog is populated
  const count = await Language.countDocuments();
  if (count === 0) {
    await ensureDefaultLanguages();
  }

  const query = activeOnly ? { isActive: true } : {};
  const languages = await Language.find(query).sort({ displayOrder: 1, name: 1 });
  return languages;
};

/**
 * Get language details by slug (e.g. 'c', 'cpp', 'java', 'python', 'javascript').
 *
 * @param {string} slug - Language unique slug
 * @returns {Promise<Object>} Language document
 */
export const getLanguageBySlug = async (slug) => {
  if (!isDBConnected()) {
    const error = new Error('Database service is currently unavailable.');
    error.statusCode = 503;
    throw error;
  }

  if (!slug || typeof slug !== 'string') {
    const error = new Error('Valid language slug is required');
    error.statusCode = 400;
    throw error;
  }

  const normalizedSlug = slug.trim().toLowerCase();
  const language = await Language.findOne({ slug: normalizedSlug, isActive: true });
  return language;
};

/**
 * Select active language for an authenticated student.
 * Updates user.selectedLanguage in database and records activity.
 *
 * @param {string} userId - Authenticated user MongoDB ObjectId
 * @param {string} languageSlug - Slug of the chosen language
 * @returns {Promise<Object>} Updated student record and selected language object
 */
export const selectStudentLanguage = async (userId, languageSlug) => {
  if (!isDBConnected()) {
    const error = new Error('Database service is currently unavailable. Please verify MongoDB is running.');
    error.statusCode = 503;
    throw error;
  }

  if (!languageSlug || typeof languageSlug !== 'string') {
    const error = new Error('Language slug is required');
    error.statusCode = 400;
    throw error;
  }

  const normalizedSlug = languageSlug.trim().toLowerCase();

  // Validate language exists and is active
  let language = await Language.findOne({ slug: normalizedSlug, isActive: true });
  if (!language && DEFAULT_LANGUAGES.some((l) => l.slug === normalizedSlug)) {
    // If database wasn't seeded yet, seed and check
    await ensureDefaultLanguages();
    language = await Language.findOne({ slug: normalizedSlug, isActive: true });
  }

  if (!language) {
    const error = new Error(`Unsupported programming language: '${languageSlug}'. Supported: C, C++, Java, Python, JavaScript`);
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findById(userId);
  if (!user) {
    const error = new Error('Student account not found');
    error.statusCode = 404;
    throw error;
  }

  user.selectedLanguage = language.slug;

  // Add real activity log for student
  if (Array.isArray(user.recentActivity)) {
    user.recentActivity.unshift({
      activityType: 'problem_solved', // mapped to existing enum
      title: `Language Switched to ${language.name}`,
      detail: `Preferred programming environment set to ${language.name} (${language.version})`,
      timestamp: new Date(),
    });

    // Keep recent activity bounded
    if (user.recentActivity.length > 20) {
      user.recentActivity = user.recentActivity.slice(0, 20);
    }
  }

  await user.save();

  return {
    student: {
      id: user._id,
      name: user.name,
      email: user.email,
      selectedLanguage: user.selectedLanguage,
    },
    selectedLanguage: language,
  };
};

/**
 * Get student's currently selected language.
 *
 * @param {string} userId - Authenticated user MongoDB ObjectId
 * @returns {Promise<Object>} Selected language details (or null if unselected)
 */
export const getStudentSelectedLanguage = async (userId) => {
  if (!isDBConnected()) {
    const error = new Error('Database service is currently unavailable.');
    error.statusCode = 503;
    throw error;
  }

  const user = await User.findById(userId);
  if (!user) {
    const error = new Error('Student account not found');
    error.statusCode = 404;
    throw error;
  }

  if (!user.selectedLanguage) {
    return {
      selectedLanguageSlug: null,
      language: null,
    };
  }

  const language = await Language.findOne({ slug: user.selectedLanguage, isActive: true });
  return {
    selectedLanguageSlug: user.selectedLanguage,
    language: language || null,
  };
};
