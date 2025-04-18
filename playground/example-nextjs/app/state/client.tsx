"use client";
import { Button } from "@omariosouto/common-ui-web/components";
import { Todo } from "../api/todos/domain";
import { TodoAppBasic } from "./components/TodoAppBasic";
import { TodoAppBasicWithPreloadedData } from "./components/TodoAppBasicWithPreloadedData";
import React from "react";


export function ExamplesGrid({
  initialData,
}: {
  initialData: Todo[];
}) {
  const [visible, setVisible] = React.useState(true);
  const [demosVisibility, setDemosVisibility] = React.useState<any>({
    basic: true,
    basicWithPreloadedData: true,
  });

  return (
    <div>
      <Button
        className="col-span-3"
        onClick={() => setVisible((prev) => !prev)}
      >
        {visible ? "Hide" : "Show"} Examples
      </Button>
      {visible && (
        <div
          className="grid grid-cols-4 gap-4 mt-10"
        >
          <div
            className="border-2 border-dashed border-gray-300 p-4 rounded-lg"
          >
            <button
              onClick={() => {
                setDemosVisibility((prev: any) => ({
                  ...prev,
                  basic: !prev.basic,
                }));
              }}
            >
              {demosVisibility.basic ? "Hide" : "Show"}
            </button>
            {demosVisibility.basic && (
              <TodoAppBasic />
            )}
          </div>
          <div
            className="border-2 border-dashed border-gray-300 p-4 rounded-lg"
          >
            <button
              onClick={() => {
                setDemosVisibility((prev: any) => ({
                  ...prev,
                  basicWithPreloadedData: !prev.basicWithPreloadedData,
                }));
              }}
            >
              {demosVisibility.basicWithPreloadedData ? "Hide" : "Show"}
            </button>
            {demosVisibility.basicWithPreloadedData && (
              <TodoAppBasicWithPreloadedData
                initialTodos={initialData}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}