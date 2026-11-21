p = "src/components/Hero.tsx"
s = open(p, encoding="utf-8").read()

# The issue: line 213 has stray whitespace inside JSX, and missing closing div
# Fix: remove the stray line and ensure proper closing
s = s.replace(
    """            </div>
          </div>
        </div>
      </div>
    </section>
  );
}""",
    """            </div>
        </div>
      </div>
    </section>
  );
}""",
    1,
)

# Also remove any stray whitespace-only lines inside JSX
import re
s = re.sub(r"^\s+$", "", s, flags=re.MULTILINE)

open(p, "w", encoding="utf-8").write(s)
print("fixed")