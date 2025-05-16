"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateGoal() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rules, setRules] = useState("");
  const [stakeAmount, setStakeAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      title,
      description,
      rules: rules
        .split("\n")
        .map((rule) => rule.trim())
        .filter((rule) => rule !== ""),
      stakeAmount,
    });
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="bg-neutral-800/80 backdrop-blur-sm border border-neutral-700 shadow-xl text-zinc-200">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Create Goal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block font-medium mb-1 text-lg">
                Title
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter goal title"
                required
                className="border-neutral-700 bg-neutral-900/50"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block  font-medium mb-1 text-lg"
              >
                Description
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter goal description"
                rows={3}
                className="border-neutral-700 bg-neutral-900/50"
              />
            </div>

            {/* Rules */}
            <div>
              <label htmlFor="rules" className="block text-lg font-medium mb-1 ">
                Rules (one per line)
              </label>
              <Textarea
                id="rules"
                value={rules}
                onChange={(e) => setRules(e.target.value)}
                placeholder="Enter rules, one per line"
                rows={4}
                className="border-neutral-700 bg-neutral-900/50"
              />
            </div>

            {/* Stake Amount */}
            <div>
              <label
                htmlFor="stakeAmount"
                className="block font-medium mb-1 text-lg"
              >
                Stake Amount
              </label>
              <Input
                id="stakeAmount"
                type="number"
                min="0"
                step="0.01"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                placeholder="Enter stake amount"
                required
                className="border-neutral-700 bg-neutral-900/50"
              />
            </div>

            {/* Dates (placeholder for future DatePicker) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1 text-lg">
                  Registration Date
                </label>
                {/* <DatePicker
                  date={registrationDate}
                  setDate={setRegistrationDate}
                  className="w-full"
                /> */}
              </div>
              <div>
                <label className="block font-medium mb-1 text-lg">
                  End Date
                </label>
                {/* <DatePicker
                  date={endDate}
                  setDate={setEndDate}
                  className="w-full"
                /> */}
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full border-2 border-neutral-800 bg-neutral-400 hover:bg-neutral-500 text-zinc-800 font-bold text-md"
            >
              Create Goal
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
