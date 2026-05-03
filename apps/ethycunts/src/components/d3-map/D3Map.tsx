import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import type { InternalGraphData } from '../../types/d3-types'
import { Button } from '@repo/ui'
import { colorForGroup } from '../../utils/colors'
import { useMapStore } from '../../store/useMapStore'

interface D3MapProps {
  graphData: InternalGraphData
}

interface D3Node extends d3.SimulationNodeDatum {
  id: string
  label: string
  group: string
  size: number
}

interface D3Link extends d3.SimulationLinkDatum<D3Node> {
  source: string | D3Node
  target: string | D3Node
  weight: number
}

export const D3Map = ({
  graphData
}: D3MapProps) => {

  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const [tooltip, setTooltip] = useState<{
    visible: boolean
    x: number
    y: number
    text: string
  }>({
    visible: false,
    x: 0,
    y: 0,
    text: '',
  })
  const activeSystem = useMapStore(state => state.activeSystem)
  const selectSystem = useMapStore(state => state.selectSystem)

  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null)
  const nodesRef = useRef<d3.Selection<
    SVGGElement,
    D3Node,
    SVGGElement,
    unknown
  > | null>(null)
  const linksRef = useRef<d3.Selection<
    SVGLineElement,
    D3Link,
    SVGGElement,
    unknown
  > | null>(null)

  useEffect(() => {
    if (!containerRef.current || !svgRef.current || !graphData.nodes?.length)
      return

    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const g = svg.append('g')

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform)
      })

    svg.call(zoom)
    zoomRef.current = zoom

    const nodes: D3Node[] = graphData.nodes.map((n) => ({ ...n }))
    const links: D3Link[] = graphData.edges.map((e) => ({ ...e }))
    
    const simulation = d3
      .forceSimulation<D3Node>(nodes)
      .force(
        'link',
        d3
          .forceLink<D3Node, D3Link>(links)
          .id((d) => d.id)
          .distance(160),
      )
      .force('charge', d3.forceManyBody().strength(-350))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force(
        'collide',
        d3.forceCollide<D3Node>().radius((d) => Math.sqrt(d.size) * 3 + 8),
      )

    const link = g
      .append('g')
      .attr('stroke', '#475569')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', 1.5)

    linksRef.current = link as unknown as d3.Selection<
      SVGLineElement,
      D3Link,
      SVGGElement,
      unknown
    >

    const nodeGroup = g
      .append('g')
      .selectAll<SVGGElement, D3Node>('.node')
      .data(nodes)
      .join('g')
      .attr('class', 'node')
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        event.stopPropagation()
        selectSystem(d.id === activeSystem ? null : d.id)
      })
      .on('mouseenter', (event, d) => {
        setTooltip({
          visible: true,
          x: event.clientX,
          y: event.clientY,
          text: d.label,
        })
      })
      .on('mousemove', (event) => {
        setTooltip((prev) => ({ ...prev, x: event.clientX, y: event.clientY }))
      })
      .on('mouseleave', () => {
        setTooltip((prev) => ({ ...prev, visible: false }))
      })
      .call(
        d3
          .drag<SVGGElement, D3Node>()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart()
            d.fx = d.x
            d.fy = d.y
          })
          .on('drag', (event, d) => {
            d.fx = event.x
            d.fy = event.y
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0)
            d.fx = null
            d.fy = null
          }),
      )

    nodesRef.current = nodeGroup

    nodeGroup
      .append('circle')
      .attr('class', 'node-glow')
      .attr('r', (d) => Math.sqrt(d.size) * 3 + 7)
      .attr('fill', 'none')
      .attr('stroke', (d) => colorForGroup(d.group))
      .attr('stroke-width', 3)
      .style('opacity', 0)

    nodeGroup
      .append('circle')
      .attr('r', (d) => Math.sqrt(d.size) * 3)
      .attr('fill', (d) => colorForGroup(d.group))
      .attr('stroke', '#0f172a')
      .attr('stroke-width', 1.5)

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => (d.source as D3Node).x!)
        .attr('y1', (d) => (d.source as D3Node).y!)
        .attr('x2', (d) => (d.target as D3Node).x!)
        .attr('y2', (d) => (d.target as D3Node).y!)
      nodeGroup.attr('transform', (d) => `translate(${d.x},${d.y})`)
    })

    svg.on('click', () => {
      selectSystem(null)
    })

    return () => {
      simulation.stop()
    }
  }, [graphData])

  useEffect(() => {
    if (!nodesRef.current || !linksRef.current) return

    if (!activeSystem) {
      nodesRef.current.style('opacity', 1)
      linksRef.current.style('opacity', 0.6)
      nodesRef.current.select('.node-glow').style('opacity', 0)
      return
    }

    const connectedIds = new Set<string>([activeSystem])
    graphData.edges.forEach((e) => {
      if (e.source === activeSystem) connectedIds.add(e.target)
      if (e.target === activeSystem) connectedIds.add(e.source)
    })

    nodesRef.current.style('opacity', (d) =>
      connectedIds.has(d.id) ? 1 : 0.25,
    )
    nodesRef.current
      .select('.node-glow')
      .style('opacity', (d) => (d.id === activeSystem ? 1 : 0))
      .style('animation', (d) =>
        d.id === activeSystem ? 'pulse 2s infinite' : 'none',
      )
    linksRef.current.style('opacity', (d) => {
      const src = typeof d.source === 'object' ? d.source.id : d.source
      const tgt = typeof d.target === 'object' ? d.target.id : d.target
      return src === activeSystem || tgt === activeSystem ? 0.85 : 0.08
    })
  }, [activeSystem, graphData])

  const handleReset = () => {
    if (!svgRef.current || !zoomRef.current) return
    d3.select(svgRef.current)
      .transition()
      .duration(750)
      .call(zoomRef.current.transform, d3.zoomIdentity)
  }

  // Derive unique groups present in the data
  const groups = Array.from(new Set(graphData.nodes.map((n) => n.group)))

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <svg ref={svgRef} className="w-full h-full block" />

      {tooltip.visible && (
        <div
          className="fixed z-50 pointer-events-none bg-gray-800/40 text-white px-2 py-1 rounded text-xs font-medium border border-border backdrop-blur-sm"
          style={{ left: tooltip.x + 15, top: tooltip.y + 15 }}
        >
          {tooltip.text}
        </div>
      )}

      <div className="absolute top-4 right-4">
        <Button
          onClick={handleReset}
        >
          Reset map
        </Button>
      </div>

      <div className="absolute top-4 left-4 bg-gray-100/30 backdrop-blur-sm p-3 rounded-lg border border-border">
        <h4 className="text-xs font-semibold mb-2 uppercase tracking-wider text-muted-foreground">
          System Types
        </h4>
        <div className="flex flex-col gap-1.5">
          {groups.map((group) => (
            <div key={group} className="flex items-center gap-2 text-xs">
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: colorForGroup(group) }}
              />
              <span className="text-gray-800 capitalize">
                {group.replace(/_/g, ' ')}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% { stroke-opacity: 0.5; stroke-width: 3px; }
          50% { stroke-opacity: 1; stroke-width: 7px; }
          100% { stroke-opacity: 0.5; stroke-width: 3px; }
        }
      `}</style>
    </div>
  )
}
