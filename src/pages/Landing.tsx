import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { TeamMemberCard } from "@/components/TeamMemberCard";
import { Button } from "@/components/ui/button";
import teamData from "@/data/team.json";

export default function Landing() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  // Extract all unique expertise domains
  const allDomains = useMemo(() => {
    const domains = new Set<string>();
    teamData.forEach((member) => {
      member.expertise.forEach((exp) => domains.add(exp));
    });
    return ["All", ...Array.from(domains).sort()];
  }, []);

  // Filter team members based on selected domain
  const filteredTeam = useMemo(() => {
    if (selectedFilter === "All") return teamData;
    return teamData.filter((member) =>
      member.expertise.includes(selectedFilter)
    );
  }, [selectedFilter]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold tracking-tight">FreelanceHub</h1>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h2 className="text-5xl font-bold tracking-tight mb-6">
              Hire Expert Developers
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Connect with our talented team of developers and designers.
              Specialized expertise across web, mobile, data science, and more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">
              Filter by Expertise
            </p>
            <div className="flex flex-wrap gap-3">
              {allDomains.map((domain) => (
                <Button
                  key={domain}
                  variant={selectedFilter === domain ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(domain)}
                  className="cursor-pointer"
                >
                  {domain}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Members - Full Width */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
          >
            <p className="text-sm text-muted-foreground">
              Showing {filteredTeam.length} developer
              {filteredTeam.length !== 1 ? "s" : ""}
            </p>
          </motion.div>

          <div className="space-y-6">
            {filteredTeam.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} variant="featured" />
            ))}
          </div>

          {filteredTeam.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <p className="text-muted-foreground">
                No developers found in this category.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-24">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h3 className="font-bold mb-2">FreelanceHub</h3>
              <p className="text-sm text-muted-foreground">
                Connecting clients with expert developers
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 FreelanceHub. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}