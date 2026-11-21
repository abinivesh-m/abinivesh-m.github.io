p = "src/components/Hero.tsx"
s = open(p, encoding="utf-8").read()

# Add the missing closing motion.div for the right column
# It should go after line 204 (the inner div close) and before line 206 (grid close)
old = '''            </div>

        </div>
      </div>
    </section>
  );
}'''

new = '''            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}'''

if old in s:
    s = s.replace(old, new, 1)
    open(p, "w", encoding="utf-8").write(s)
    print("fixed missing motion.div close")
else:
    print("OLD NOT FOUND")